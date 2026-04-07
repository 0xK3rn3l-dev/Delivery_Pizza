import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';


interface CreateUserData {
      email: string;
      password: string;
      userName?: string;
      phoneEnc?: string;
      phoneHash?: string;
      isVerified?: boolean;
    }

interface UpdateUserData {
    userName?: string;
    phoneEnc?: string;
    phoneHash?: string;
    isVerified?: boolean;
}

const USER_SELECT_FIELDS = {
    id: true,
    email: true,
    userName: true,
    role: true,
    isVerified: true,
    createdAt: true,
} as const;


@Injectable()
export class UserService {
    public constructor(
        private readonly prismaService: PrismaService,) {}


    // -----------
    //    FIND
    // -----------
    public async findById(id: number) {
        const user = await this.prismaService.user.findUnique({where: {id} });
        if(!user) {
            throw new NotFoundException('User not found')}
        return user
    }
    
    public async findByEmail(email: string) {
        const user = await this.prismaService.user.findUnique({where: {email} });
        return user
    }

    public async findByPhoneHash(phoneHash: string) {
    return this.prismaService.user.findUnique({
        where: { phoneHash }
        });
    }


    // -----------
    //    help
    // -----------
    public async ensureEmailIsUnique(email: string): Promise<void> {
        const user = await this.findByEmail(email);
        if (user) {
            throw new ConflictException('Пользователь с таким email уже существует');
        }
    }

    public async ensureUserExists(id: number): Promise<void> {
        const user = await this.prismaService.user.findUnique({
            where: { id },
            select: { id: true }
        });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
    }


    // -----------
    //    CREATE
    // -----------
    public async create(data: CreateUserData) {
        await this.ensureEmailIsUnique(data.email); 
        const user = await this.prismaService.user.create({
            data: {
                email: data.email,
                password: data.password,
                userName: data.userName,
                phoneEnc: data.phoneEnc,
                phoneHash: data.phoneHash,
                isVerified: data.isVerified ?? false, // по умолчанию false
            }
        });
        return user;
    }

    // -----------
    //    UPDATE
    // -----------
    public async update(id: number, data: UpdateUserData) {
        await this.ensureUserExists(id);
        return this.prismaService.user.update({
            where: { id },
            data: {
                userName: data.userName,
                phoneEnc: data.phoneEnc,
                phoneHash: data.phoneHash,
                isVerified: data.isVerified,
            }
        });
    }

    public async updatePassword(id: number, hashedPassword: string) {
        await this.ensureUserExists(id);
        return this.prismaService.user.update({
            where: { id },
            data: { password: hashedPassword }
        });
    }

    public async updateVerifyUser(id: number) {
        await this.ensureUserExists(id);
        return this.prismaService.user.update({
            where: { id },
            data: { isVerified: true }
        });
    }






    // ------------
    //  FOR ADMIN
    // ------------


    // DELETE
    public async delete(id: number) {
        await this.ensureUserExists(id);
        return this.prismaService.user.delete({ where: { id } });
    }

    // -----------
    //    LIST (ADMIN)
    // -----------
    public async findAll(params?: { skip?: number; take?: number }) {
        return this.prismaService.user.findMany({
            skip: params?.skip,
            take: params?.take,
            orderBy: { createdAt: 'desc' },
            select: USER_SELECT_FIELDS,
        });
    }

    public async count(): Promise<number> {
        return this.prismaService.user.count();
    }
}




