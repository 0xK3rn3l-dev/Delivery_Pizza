import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import type { Response, Request } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
    ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Успешно создано' })
  public async register(@Body() dto: RegisterDto, res: Response) {
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
  async activate(req, res){
    const activationLink = req.params.link;
    await this.authService.activate(activationLink)
    return res.redirect(process.env.ALLOWED_ORIGIN);
  }
  
}



  //@Get('refresh')
  //@HttpCode(HttpStatus.OK)
  //async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
  //  return this.tokenService.refreshTokens(req, res);
  //}
 
