import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { UserService } from '../user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt-constant.js' 
import { HashService } from './hash/hash.service.js';
import { ConfigModule } from '@nestjs/config'; 
import { PhoneEncryption } from './phone/enc-phone';
import { OrderModule } from '../order/order.module';

@Module({
  imports: [
    ConfigModule, // для jwt passport
    OrderModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    }),],
  
  controllers: [AuthController],
  
  providers:   [
    AuthService, 
    UserService,
    HashService,
    PhoneEncryption,],
  
    exports: [AuthService],
})

export class AuthModule {}
