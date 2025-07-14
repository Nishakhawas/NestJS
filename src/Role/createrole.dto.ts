import { IsNotEmpty} from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  name!: string;
  
    
}

