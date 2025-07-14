import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { Group } from './group.entity';
import { Permission } from './permission.entity';

@Entity()
export class CreateUser {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  userName!: string;

  @Column({ unique: true })
  userEmail!: string;

  @Column()
  password!: string;

  @Column()
  confirmPassword!: string;

  @Column()
  fullName!: string;

  @Column()
  contact!: number;

  @Column()
  location!: string;

  @Column()
  employee!: string;

  @Column()
  department!: string;

  @Column({ default: false })
  isActive!: boolean;

  // Many users can belong to one group
  @ManyToOne(() => Group, (group) => group.users, {eager:true} )
  @JoinColumn({ name: 'groupId' })
  group!: Group;

 @ManyToMany(() => Permission)
@JoinTable()
permissions: Permission[];

 
}


 // @ManyToMany(() => Permission, (permission) => permission.users, { cascade: true })
  // @JoinTable() 
  // permissions: Permission[];