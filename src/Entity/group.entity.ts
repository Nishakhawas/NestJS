import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { CreateUser } from './createuser.entity';
import { Permission } from './permission.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  groupName!: string;

  @Column()
  groupCode!: string;

  @Column()
  location!: string;

  @Column()
  remarks!: string;

  @Column({ default: false })
  isActive!: boolean;

  //  One group has many users
  @OneToMany(() => CreateUser, (user) => user.group)
  users!: CreateUser[];

  @ManyToMany(() => Permission, permission=>permission.groups)
  @JoinTable()
  permissions: Permission[];
}
