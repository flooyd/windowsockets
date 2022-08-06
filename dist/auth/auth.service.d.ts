import { Model } from 'mongoose';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { User, UserDocument } from './schemas/user.schema';
export declare class AuthService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    register(registerUserDto: RegisterUserDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<User>;
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hashPassword: string): Promise<boolean>;
}
