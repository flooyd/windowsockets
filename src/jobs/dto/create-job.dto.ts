import { IsEmail, IsIn, IsNumber, IsString, Min } from 'class-validator';

export class CreateJobDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(20)
  price: number;

  @IsString()
  @IsIn(['lawn, car, carWindows, residential, business'])
  type: string;
}
