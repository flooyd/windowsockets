import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { hash, compare } from 'bcrypt';

import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    if (await this.userModel.findOne({ email: registerUserDto.email })) {
      throw new HttpException(
        'Email is already in use',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    let hashedPassword = await this.hashPassword(registerUserDto.password);

    return await this.userModel.create({
      email: registerUserDto.email,
      password: hashedPassword,
    });
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    let foundUser = await this.userModel.findOne({ email: loginUserDto.email });

    if (!foundUser) {
      throw new HttpException(
        'Invalid Email or Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const passwordIsValid = await this.validatePassword(
      loginUserDto.password,
      foundUser.password,
    );

    if (!passwordIsValid) {
      throw new HttpException(
        'Invalid Username or Password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return foundUser;
  }

  async hashPassword(password: string): Promise<string> {
    return await hash(password, 12);
  }

  async validatePassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const match = await compare(password, hashPassword);

    if (match) {
      return true;
    } else {
      return false;
    }
  }
}
