import { Controller, Body, Get, HttpCode, HttpStatus, Post, UseGuards,Request, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/role/roles.decorator';
import { Role } from '../auth/role/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';

@ApiTags('user')
@Controller()
export class UserController {
  public constructor(private readonly userService: UserService) {}

  // Protected Endpoints
  // Authorisation user profile
  @ApiOperation({ summary: 'Авторизированный пользователь' })
  @ApiResponse({ status: 200, description: 'Доступ открыт' })
  @ApiBearerAuth() // Показывает иконку замка (нужен токен)
  @UseGuards(AuthGuard, RolesGuard ) //JwtAuthGuard возможно поменять
  @Roles(Role.REGULAR, Role.ADMIN)
  @Get('me/profile')
  async getProfile(@Request() req) {
    const userId = req.user.sub;
    return this.userService.getProfile(userId);
  }
 
}