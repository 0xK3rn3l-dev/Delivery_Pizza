import { BadRequestException, ConflictException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash/hash.service.js'; 
import { HashField } from './hash/hash.enum.js';
import type { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto.js'
import { LoginDto } from './dto/login.dto.js';
import { PhoneEncryption } from './phone/enc-phone.js';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service';
import { TokenService } from './tokens.service.js';

@Injectable()
export class AuthService {
    
    public constructor(
        private readonly userService: UserService,
        private readonly hashService: HashService, 
        private readonly phoneEncryption: PhoneEncryption,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
    ) {}  
    
    public async register(dto: RegisterDto, res: Response) {
        const isExist = await this.userService.findByEmail(dto.email)
        if(isExist){
            throw new ConflictException('Пользователь с таким email уже существует')
        }
        const hashedPassword = await this.hashService.hash(dto.password);
        const activationLink = uuidv4();
        const phoneHash = this.hashService.hashPhone(dto.phone);
        const phoneEnc = this.phoneEncryption.encryptPhoneToString(dto.phone);
                
        const userData = {
            email: dto.email,
            password: hashedPassword,
            activationLink: activationLink,
            phoneHash: phoneHash,
            phoneEnc: phoneEnc,
            isVerified: false,
        };

        const newUser = await this.userService.create(userData);
        await this.mailService.sendActivationMail(dto.email, `${process.env.APPLICATION_URL}/auth/activate/${activationLink}`);
        console.log(`Activation link: ${process.env.APPLICATION_URL}/auth/activate/${activationLink}`);
        
        const payload = { sub: Number(newUser.id), email: newUser.email, role: newUser.role };
        const { access_token, refresh_token } = await this.tokenService.generateTokens(payload);
        this.tokenService.setRefreshTokenCookie(res, refresh_token);
        await this.tokenService.saveRefreshToken(newUser.id, refresh_token);
        return {
            access_token,
            refresh_token,
            user: {email: newUser.email} // for tests
        };
    }


    public async activate(activationLink: string) {
    const user = await this.userService.findOneByField('ActivationLink', activationLink);
    
    if (!user) {
        throw new BadRequestException('Неверная ссылка активации');
    }
    await this.userService.updateVerifyUser(user.id);
    return user;
}



    private async validateUser(dto: LoginDto): Promise<any> {
        const user = await this.userService.findByEmail(dto.email);
        if (user) {
            const isPasswordValid = await this.hashService.compare(dto.password, user.password);
            if (isPasswordValid) {
                const { password, ...userValidate } = user;
                return userValidate;
            }
        }
        return null;
    }


    public async login(dto: LoginDto,res: Response) {
        const user = await this.validateUser(dto);
        if (!user) {
            throw new UnauthorizedException('Неверный email или пароль');
        }

        const payload = { sub: user.id, email: user.email, role: user.role};
        const { access_token, refresh_token } = await this.tokenService.generateTokens(payload);
        
        this.tokenService.setRefreshTokenCookie(res, refresh_token);
        await this.tokenService.saveRefreshToken(user.id, refresh_token);
        console.log('Cookie set:', refresh_token); 
        
        return {
            access_token: access_token,
            refresh_token: refresh_token,
            user_data: {email: user.email, role: user.role} // Убрать роль позже
        }

    }

    
    public async logout(res: Response) {
        this.tokenService.clearRefreshTokenCookie(res);
        return { message: 'Logged out successfully' };
    }






    //public async refreshAccessToken(refresh_token: string, res: Response) {
    //    const { access_token, refresh_token: new_refresh_token } = 
    //        await this.tokenService.refreshTokens(refresh_token);
    //    
    //    this.tokenService.setRefreshTokenCookie(res, new_refresh_token);
    //    
    //    return { access_token };
    //}

}