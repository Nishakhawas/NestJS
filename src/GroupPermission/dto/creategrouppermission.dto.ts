import { IsArray,  IsNotEmpty, IsOptional} from 'class-validator';

export class CreateGroupPermissionDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  name!: string;
  @IsArray({ message: 'Permissions must be an array' })
  @IsOptional()
  permissions!: number[]; 
    
}



