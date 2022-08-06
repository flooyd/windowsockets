import { LoggerService } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { AuthService } from './auth.service';
import { User } from './schemas/user.schema';
export declare class AuthController {
    private readonly authService;
    private readonly logger;
    constructor(authService: AuthService, logger: LoggerService);
    login(loginUserDto: LoginUserDto): Promise<User>;
    register(createUserDto: RegisterUserDto): Promise<User>;
}
