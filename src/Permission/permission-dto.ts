import { IsNotEmpty } from "class-validator";

export class CreatePermissionDto {
  @IsNotEmpty({ message: 'Please fill the name field' })
  name: string;

  @IsNotEmpty({ message: 'Please fill the create_access field' })
  create_access: boolean;

  @IsNotEmpty({ message: 'Please fill the read_access field' })
  read_access: boolean;

  @IsNotEmpty({ message: 'Please fill the update_access field' })
  update_access: boolean;

  @IsNotEmpty({ message: 'Please fill the delete_access field' })
  delete_access: boolean;
}
