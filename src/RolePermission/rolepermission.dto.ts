import { IsArray,  IsNotEmpty, IsOptional} from 'class-validator';

export class CreateRolePermissionDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  name!: string;
  @IsArray({ message: 'Permissions must be an array' })
  @IsOptional()
  permissions!: number[]; // Array of permission IDs
    
}


