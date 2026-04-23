import { BadRequestException, ConflictException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService,
                private readonly prisma: PrismaService,
                private readonly userService: UserService  
                ) {}

    async generateTokens(payload: { sub: Number; email: string; role: string }) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' })
        ]);

        return { access_token, refresh_token };
    }



    async saveRefreshToken(userId: number, refreshToken: string) {
        // Устанавливаем срок годности как у куки (7 дней)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7);
        
        // Затираем старые токены этого юзера перед сохранением нового (чтобы не плодить миллионы записей)
        await this.prisma.token.deleteMany({ where: { userId } });
        
        // Сохраняем новый
        await this.prisma.token.create({
            data: {
                userId,
                refreshToken,
                expiresAt,
            },
        });
    }


    async refreshAccessToken(refreshToken: string, res: Response) {
        // 1. Ищем в БД
        const tokenRecord = await this.prisma.token.findUnique({
            where: { refreshToken },
        });

        if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
            throw new UnauthorizedException('Refresh token invalid or expired');
        }

        // 2. Ищем юзера
        const user = await this.userService.findById(tokenRecord.userId);

        // 3. Генерим новую пару токенов
        const payload = { sub: Number(user.id), email: user.email, role: user.role };
        const tokens = await this.generateTokens(payload);

        // 4. Перезаписываем refresh в БД (ротация токенов)
        await this.saveRefreshToken(user.id, tokens.refresh_token);

        // 5. Ставим новую куку
        this.setRefreshTokenCookie(res, tokens.refresh_token);

        return { access_token: tokens.access_token };
    }
    

    setRefreshTokenCookie(res: Response, refresh_token: string) {
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/',
        });
    }


    clearRefreshTokenCookie(res: Response) {
        res.clearCookie('refresh_token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });
    }


}
