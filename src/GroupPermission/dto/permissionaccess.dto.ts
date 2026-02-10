import { IsBoolean, IsNumber } from "class-validator";

export class PermissionAccessDto {

   @IsNumber()
  permissionId: number;

  @IsBoolean()
  create_access: boolean;

  @IsBoolean()
  read_access: boolean;

  @IsBoolean()
  update_access: boolean;

  @IsBoolean()
  delete_access: boolean;
}

