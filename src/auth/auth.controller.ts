import {
  Body,
  Controller,
  Inject,
  Logger,
  LoggerService,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';

@Controller('api/auth')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  async register(@Body() createUserDto: RegisterUserDto): Promise<User> {
    return await this.authService.register(createUserDto);
  }
}
