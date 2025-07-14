import { IsBoolean } from "class-validator";

export class PermissionAccessDto {
  @IsBoolean()
  create_access: boolean;

  @IsBoolean()
  read_access: boolean;

  @IsBoolean()
  update_access: boolean;

  @IsBoolean()
  delete_access: boolean;
}
