import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { Permission } from "./permission.entity";

@Entity()
export class GroupPermission {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Group, group => group.groupPermissions)
  group: Group;

  @ManyToOne(() => Permission, permission => permission.groupPermissions, { eager: true })
  permission: Permission;

  @Column({ default: false })
  create_access: boolean;

  @Column({ default: false })
  read_access: boolean;

  @Column({ default: false })
  update_access: boolean;

  @Column({ default: false })
  delete_access: boolean;
}
