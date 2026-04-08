import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsOptional, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email пользователя' })
  @IsString({ message: "Почта должна быть строкой" })
  @IsEmail({}, { message: "Строка должна быть почтой" })
  @IsNotEmpty({ message: "Строка не может быть пустой" })
  email!: string;

  @ApiProperty({ example: 'Pass_Word123', minLength: 8, description: 'Пароль (минимум 8 символов, заглавная буква, строчная буква, цифра и один символ "_")' })
  @IsString({ message: "Пароль должен быть строкой" })
  @IsNotEmpty({ message: "Пароль не может быть пустым" })
  @MinLength(8, { message: "Пароль должен быть больше или равен 8 символам" })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[A-Za-z\d_]+$/, 
    { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one underscore "_"' })
  password!: string;

  @ApiProperty({ example: '+79991234567', description: 'Номер телефона', required: false })
  @IsNotEmpty()
  @IsPhoneNumber('RU', { message: "Неверный формат номера телефона" })
  phone!: string;
}