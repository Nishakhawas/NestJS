import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatePageDto {
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
  description!: string;

  @IsOptional()
  @IsString()
  metaTitle!: string;

  @IsOptional()
  @IsString()
  metaKeyword!: string;

  @IsString()
  metaDescription!: string;
  
  @IsBoolean()
  isPublish!: boolean;


}
