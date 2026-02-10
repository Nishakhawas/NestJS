import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('login_activity')
export class LoginActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginuserid: number;

  @Column()
  loginuseremail: string;

  @Column()
  logindatead?: string; 

  @Column()
  logindatebs?: string; // BS date YYYY/MM/DD

  @Column()
  logintime: string; // HH:mm:ss

  @Column({nullable: true})
  loginip: string;

  @Column({nullable: true})
  loginmac: string;

  @Column({nullable: true})
  isvalidlogin: boolean; // true or false

  @Column({nullable: true})
  locationid: string;
}
