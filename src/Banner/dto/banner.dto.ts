import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateBannerDto {
  @IsString()
  @IsNotEmpty()
  bannerHeading: string;

  @IsOptional()
  @IsString()
  ImageUrl?: string;

  @IsString()
  bannerContents: string;

  @IsOptional()
  @IsString()
  buttonText1?: string;

  @IsOptional()
  @IsString()
  buttonUrl1?: string;

  @IsOptional()
  @IsString()
  buttonText2?: string;

  @IsOptional()
  @IsString()
  buttonUrl2?: string;

  @IsOptional()
  @IsString()
  order?: string;

  @IsBoolean()
  isPublish: boolean;

  @IsBoolean()
  isUnlimited: boolean;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;
}
