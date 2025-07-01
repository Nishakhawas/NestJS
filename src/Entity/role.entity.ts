import { Column, Unique, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, Index } from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "./user.entity";

@Entity()
@Unique('role',['name'])
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. 'admin', 'editor'

  @ManyToMany(() => Permission, permission=>permission.roles)
  @JoinTable()
  permissions: Permission[];

  @OneToMany(() => User, user => user.role)
  users: User[]; //THIS is what role.users refers to!
}
