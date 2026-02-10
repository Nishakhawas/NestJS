import { Transform, Type } from 'class-transformer';
import { IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreateTileDto {
  @IsString()
  title: string;

  @IsString()
  icon: string;

  @IsString()
  content: string;

  @IsNumber()
   @Transform(({ value }) => value !== '' ? Number(value) : undefined)
  @Type(() => Number)
  order: number;

  @IsString()
  imageUrl?: string;

   @IsBoolean()
   isPublish: boolean;
}
