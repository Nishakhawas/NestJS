import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity()
@Unique('user_name', ['name'])
@Unique('user_email', ['email'])
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column()
  password!: string;
  @ManyToOne(() => Role, role =>role.users ,{ eager: true })
  role: Role;
  permissions:Permission;
}

