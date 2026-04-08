import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsString({ message: "Email must be a string" })
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Email is required" })
  email!: string;

  @ApiProperty({ example: 'Pass_Word123', minLength: 8, description: 'Пароль (минимум 8 символов, заглавная буква, строчная буква, цифра и один символ "_")'})
  @IsString({ message: "Password must be a string" })
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(8, { message: "Password must be at least 8 characters long" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]+$/,
    { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one underscore "_"' }
  )
  password!: string;

  @ApiProperty({ example: '+79991234567', description: 'Номер телефона', required: false })
  @IsOptional()
  @IsPhoneNumber('RU', { message: "Неверный формат номера телефона" })
  phone!: string;


}