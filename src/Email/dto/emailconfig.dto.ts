import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class EmailConfigDto {
@IsString({ message: 'Name must be a string' })
mailFrom!: string;
  @IsString({ message: 'Name must be a string' })
  mailAddress!: string;
  @IsString()
  host!: string;
  @IsString({ message: 'Name must be a string' })
  username!: string;
  @IsString({ message: 'Name must be a string' })
  password!: string;
  @IsNumber()
  port!: number;
  @IsString({ message: 'Name must be a string' })
  protocol!: string;

  @IsString({ message: 'Name must be a string' })
  Encryption!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;
}