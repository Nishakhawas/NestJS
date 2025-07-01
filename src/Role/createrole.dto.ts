import { IsNotEmpty} from 'class-validator';

export class CreateRole {
  @IsNotEmpty({ message: 'Please fill the name field' })
  name!: string;
  
    
}


// updaterole controller 