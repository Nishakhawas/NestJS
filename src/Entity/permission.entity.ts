import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { GroupPermission } from "./grouppermission.entity";

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; 

  @Column()
  create_access:boolean; 

  @Column()
  read_access:boolean; 

  @Column()
  update_access:boolean;

  @Column()
  delete_access:boolean;

  @ManyToMany(() => Group, group => group.permissions)
  groups: Group[]; 

// @OneToMany(() => GroupPermission, gp => gp.permission)
// groupPermissions: GroupPermission[];

 

}


//  @ManyToMany(() => Role, role => role.permissions)
//   roles: Role[]; 
 // @ManyToMany(() => CreateUser, (user) => user.permissions)
  // users: CreateUser[]; 