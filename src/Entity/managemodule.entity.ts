import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ManageModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentMenu: string;

  @Column({ unique: true })
  menu: string;

  @Column()
  displayText1: string;

  @Column({ nullable: true })
  displayText2: string;

  @Column()
  menuLink: string;

  @Column({ nullable: true })
  menuIconClass: string;

  @Column({ nullable: true })
  menuOrder: string;

  @Column({ nullable: true })
  remarks: string;

  @Column({ default: true })
  isActive: boolean;
 
  // @Column() // Stores array like: "Insert,View,Update"
  // operations: string;
}
