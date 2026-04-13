import { BadRequestException, ConflictException, Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AdminService {
    
    public constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,

    ) {}

    public async getAllUsers() {

    };

}