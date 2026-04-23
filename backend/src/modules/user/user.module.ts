import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { PhoneEncryption } from '../auth/phone/enc-phone';
import { UserController } from './user.controller'; 
import { OrderModule } from '../order/order.module';

@Module({
  imports: [forwardRef(() => OrderModule)],
  providers: [UserService, PhoneEncryption],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}