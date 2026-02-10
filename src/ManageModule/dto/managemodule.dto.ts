import { IsOptional, IsString, IsBoolean, IsNumber } from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateManageModuleDto {

  @IsString()
  parentMenu!: string;

  @IsString()
  menu!: string;

  @IsString()
  displayText1!: string;

  @IsOptional()
  @IsString()
  displayText2!: string;

  @IsString()
  menuLink!: string;

  @IsOptional()
  @IsString()
  menuIconClass!: string;

  // @IsOptional()
  // @IsString()
  // menuOrder!: string;
  
@IsOptional()
@IsNumber()
menuOrder?: number;


@CreateDateColumn({ name: 'postDateAD', type: 'timestamp' })
postDateAD: Date;

@UpdateDateColumn()
updatedAt: Date;

  @IsOptional()
  @IsString()
  remarks!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;

}
