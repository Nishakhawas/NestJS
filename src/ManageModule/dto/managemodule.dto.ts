import { IsOptional, IsString, IsBoolean, IsArray } from 'class-validator';

export class CreateManageModuleDto {
 
  @IsString()
  parentMenu?: string;

  @IsString()
  menu: string;

  @IsString()
  displayText1: string;

  @IsOptional()
  @IsString()
  displayText2?: string;

  @IsString()
  menuLink: string;

  @IsOptional()
  @IsString()
  menuIconClass!: string;

  @IsOptional()
  @IsString()
  menuOrder!: string;

  @IsOptional()
  @IsString()
  remarks!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;

  // @IsArray()
  // @IsString({ each: true })
  // operations: string;
}
