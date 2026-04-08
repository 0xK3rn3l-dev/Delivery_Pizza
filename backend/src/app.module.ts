import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.modul';
import { PrismaModule } from './prisma.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    PrismaModule, 
    AuthModule, 
    UserModule],
  
  controllers: [],
  
  providers: [],
})

export class AppModule {}
