import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UnauthorizedException, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import type { Response, Request } from 'express';


@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Регистрация пользователя' })
  @ApiResponse({ status: 201, description: 'Успешно создано' })
  public async register(@Body() dto: RegisterDto) {
      return this.authService.register(dto)
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

}