import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response, Request } from 'express';
import { TokenService } from './tokens.service.js';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Успешно создано' })
  public async register(@Body() dto: RegisterDto, @Res({ passthrough: true }) res: Response) {
      return this.authService.register(dto, res)
  }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешный вход. Возвращает access и refresh токены.'})
  @ApiResponse({ status: 401, description: 'Неверный email или пароль' })
  public async login(@Body() dto: LoginDto, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    console.log('Cookies:', request.cookies); 
    const result = await this.authService.login(dto, response);
    return result; 
  }


  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешный выход.'})
  @ApiResponse({ status: 401, description: 'ошибка выхода' })
  public async logout(res: Response) {
    return this.authService.logout(res)
  }


  @Get('/activate/:link')
  @HttpCode(HttpStatus.OK)
  async activate( @Param('link') link: string, @Res() res: Response){
    await this.authService.activate(link)
    return res.redirect(process.env.ALLOWED_ORIGIN || 'http://localhost:3000');
  }


  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Обновить access token по refresh token из куки' })
  async refresh(@Req() req: Request,@Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refresh_token;
    if (!refreshToken) {
        throw new UnauthorizedException('Refresh token not found');
    }
    return this.tokenService.refreshAccessToken(refreshToken, res);
  }
 
}