import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

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

 

}


//  @ManyToMany(() => Role, role => role.permissions)
//   roles: Role[]; 
 // @ManyToMany(() => CreateUser, (user) => user.permissions)
  // users: CreateUser[]; 