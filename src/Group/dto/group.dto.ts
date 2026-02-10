// import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// export class CreateGroupDto {

// @IsNotEmpty({ message: 'Please fill the name field' })
// @IsString()
// groupName!: string;

// @IsString()
// groupCode!: string;

// @IsString()
// location!: string;

// @IsString()
// remarks!: string;

// @IsOptional()
// @IsBoolean()
// isActive!: boolean;

// }


import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateGroupDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  @IsString()
  @MinLength(1, { message: 'Group name cannot be empty string' })
  groupName!: string;

  @IsString()
  @MinLength(1, { message: 'Group code cannot be empty' })
  groupCode!: string;

  @IsString()
  @MinLength(1, { message: 'Location cannot be empty' })
  location!: string;

  @IsString()
  @MinLength(1, { message: 'Remarks cannot be empty' })
  remarks!: string;

  @IsOptional()
  @IsBoolean()
  isActive!: boolean;
}
