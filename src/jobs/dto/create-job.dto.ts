import { IsArray, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  @IsIn(['lawn', 'car', 'carWindows', 'residential', 'business'])
  type: string;

  @IsOptional()
  @IsArray()
  notes: string[];
}
