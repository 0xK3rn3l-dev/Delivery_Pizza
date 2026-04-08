import { Controller, Get, Post, Body, Param, UseGuards, Request } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}


  
}