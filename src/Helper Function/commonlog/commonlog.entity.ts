import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tablename: string;

  @Column()
  primarykey: string;

  @Column()
  primaryid: string;

  @Column()
  action: 'Insert' | 'Update' | 'Delete';

   @Column( {  type: 'longtext', nullable: true })
  dataold: any;
  
  @Column( {  type: 'longtext', nullable: true })
  datanew: any;

  @Column({ type: 'varchar', length: 20 })
  postdatead: string;

  @Column({ type: 'varchar', length: 20 })
  postdatebs: string;

  @Column({ type: 'varchar', length: 20 })
  posttime: string;

  @Column({ type: 'varchar', length: 100 })
  postip: string;

  @Column({ type: 'varchar', length: 100, default: 'UNKNOWN' })
  postmac: string;

  @Column()
  postby: string;

  @Column()
  locationid: number;
}
