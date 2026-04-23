import { Controller, Get, Post, Body, Param, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user/user.service';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService,
              private readonly userService: UserService,
  ) {}


  @Post()
  @UseGuards(AuthGuard)
  async createOrder(@Request() req) {
    const user = await this.userService.findById(req.user.sub);
    if (!user.isVerified) {
        throw new ForbiddenException('Подтвердите email перед заказом');
    }
    // ... создание заказа
}


  
}