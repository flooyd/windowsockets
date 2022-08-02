import { IsEmail, isNumber, IsNumber, Max, Min, min } from 'class-validator';

export class CreateJobDto {
  @IsEmail()
  email: string;

  @IsNumber()
  @Min(1000000000)
  @Max(9999999999)
  phone: number;

  @IsNumber()
  @Min(20)
  price: number;

  @IsNumber()
  @Min(1)
  numWindows: number;
}
