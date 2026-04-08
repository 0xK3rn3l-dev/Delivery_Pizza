import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PhoneEncryption } from '../auth/phone/enc-phone';
import { UserController } from './user.controller'; 
import { OrderModule } from '../order/order.module';
import { OrderService } from '../order/order.service';

@Module({
  imports: [OrderModule],
  providers: [UserService, PhoneEncryption, OrderService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}