import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({ message: 'Email should be an email address.' })
  readonly email: string;

  @MinLength(8, { message: 'Password should be at least 8 characters.' })
  readonly password: string;
}
