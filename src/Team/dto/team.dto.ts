import { IsString, IsEmail, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  name!: string;

  @IsString()
  designation: string;

  @IsString()
  type: string;

  @IsString()
  address: string;

  @IsOptional()
  imageUrl: string;

  @IsOptional()
  testimonial: string;

  @IsOptional()
  skills: string;

  @IsOptional()
  whatIDo: string;

  @IsString()
  phone!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  facebook!: string;

  @IsOptional()
  twitter!: string;

  @IsOptional()
  linkedin!: string;

  @IsOptional()
  instagram!: string;

  @IsOptional()
  youtube!: string;

  @IsBoolean()
  isPublish!: boolean;

  @IsNumber()
  order!: number;
}
