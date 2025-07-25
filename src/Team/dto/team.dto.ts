import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  pageMenu!: string;

  @IsOptional()
  @IsString()
  title!: string;

  @IsString()
  pageAlise!: string;

  @IsOptional()
  @IsString()
  imageUrl!: string;

  @IsString()
  shortContent!: string;

  @IsOptional()
  @IsString()
  Description!: string;

  @IsOptional()
  @IsString()
  metaTitle!: string;

  @IsOptional()
  @IsString()
  metaKeyword!: string;

  @IsString()
  metaDescription!: string;

  

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
