import { BadRequestException, ConflictException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { HashService } from './hash/hash.service.js'; 
import { HashField } from './hash/hash.enum.js';
import type { Response, Request } from 'express';
import { RegisterDto } from './dto/register.dto.js'
import { LoginDto } from './dto/login.dto.js';
import { PhoneEncryption } from './phone/enc-phone.js';

@Injectable()
export class AuthService {
    
    public constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        private readonly hashService: HashService, 
        private readonly phoneEncryption: PhoneEncryption, 
    ) {}
    

    //private readonly ACCESS_TOKEN_EXPIRES = process.env.JWT_ACCESS_EXPIRES || '15m';
    //private readonly REFRESH_TOKEN_EXPIRES = process.env.JWT_REFRESH_EXPIRES || '7d';
    
    
    public async register(dto: RegisterDto) {
        const isExist = await this.userService.findByEmail(dto.email)
        if(isExist){
            throw new ConflictException('Пользователь с таким email уже существует')
        }

        const hashedPassword = await this.hashService.hash(dto.password);
        const phoneHash = this.hashService.hashPhone(dto.phone);
        const phoneEnc = this.phoneEncryption.encryptPhoneToString(dto.phone);


        const userData = {
            email: dto.email,
            password: hashedPassword,
            phoneHash: phoneHash,
            phoneEnc: phoneEnc,
            isVerified: false,
        };

        const newUser = await this.userService.create(userData);
        
        return {
            message: 'Регистрация прошла успешно',
            user: {email: newUser.email} // for tests
        };
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

        const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refresh_token = await this.jwtService.signAsync(payload, {expiresIn: '7d',});
        
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // 'strict'
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/', // path: '/auth/refresh'
        });

        console.log('Cookie set:', refresh_token); 
        
        return {
            access_token: access_token,
            user_data: {email: user.email, role: user.role} // Убрать роль позже
        }

    }

    async refreshToken(req: Request, res: Response) {
        const refreshToken = req.cookies['refresh_token'];
  
        if (!refreshToken) {
          throw new UnauthorizedException('Refresh token not found');
        }
    
        try {
          const payload = await this.jwtService.verifyAsync(refreshToken, {
            secret: process.env.JWT_SECRET,
          });
      
          const user = await this.userService.findById(payload.sub);
          if (!user) {
            throw new UnauthorizedException('User not found');
          }
      
          const newPayload = { sub: user.id, email: user.email, role: user.role };
          const newAccessToken = await this.jwtService.signAsync(newPayload, { expiresIn: '15m' });
      
          return { access_token: newAccessToken };
      
        } catch (error) {
          throw new UnauthorizedException('Invalid refresh token');
        }
    }

}