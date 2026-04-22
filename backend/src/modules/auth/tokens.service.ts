import { BadRequestException, ConflictException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class TokenService {
    constructor(private readonly jwtService: JwtService) {}

    async generateTokens(payload: { sub: string; email: string; role: string }) {
        const [access_token, refresh_token] = await Promise.all([
            this.jwtService.signAsync(payload, { expiresIn: '15m' }),
            this.jwtService.signAsync(payload, { expiresIn: '7d' })
        ]);

        return { access_token, refresh_token };
    }



    //async saveTokens(){
    //
    //  }



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