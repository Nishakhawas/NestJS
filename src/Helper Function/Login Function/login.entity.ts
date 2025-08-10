import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class LoginActivity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loginuserid: number;

  @Column()
  loginuseremail: string;

  @Column()
  logindatead: string; 

  @Column()
  logindatebs: string; // BS date YYYY/MM/DD

  @Column()
  logintime: string; // HH:mm:ss

  @Column()
  loginip: string;

  @Column()
  loginmac: string;

  @Column()
  isvalidlogin: string; // 'Y' or 'N'

  @Column()
  locationid: number;
}
