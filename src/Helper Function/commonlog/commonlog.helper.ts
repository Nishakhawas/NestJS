import { Repository } from 'typeorm';
import { AuditLog } from './commonlog.entity';
import * as moment from 'moment';
import { Nepequengdate } from '../Date/nepequengdate.entity';

interface LogPayload {
 tablename?: string;
  primarykey?: string;
  primaryid?: string | number; // ok here, we’ll convert it later
  action?: 'Insert' | 'Update' | 'Delete';
  dataold?: any; 
  datanew?: any;
  postip?: string;
  postmac?: string;
  postby?: string;
  locationid?: number;
}


export async function saveAuditLog(
  auditRepo: Repository<AuditLog>,
  data: LogPayload,
  dateRepo: Repository<Nepequengdate>
): Promise<void> {
  const adDate = moment().format('YYYY/MM/DD');
  const time = moment().format('HH:mm:ss');
  // Look up BS date from DB
  const dateMatch = await dateRepo.findOne({ where: { addate: adDate } });
  const bsDate = dateMatch?.bsdate || null;

  // Convert AD date to BS date
  const log = auditRepo.create({
    tablename: data.tablename,
    primarykey: data.primarykey,
    primaryid: String(data.primaryid),
    action: data.action,
    dataold: data.dataold, 
    datanew: data.datanew,
    postby: data.postby,
    postip: data.postip,
    postmac: data.postmac ,
    locationid: data.locationid,
    postdatead: adDate,
    postdatebs: bsDate ??'',
    posttime: time,
  }, );

  await auditRepo.save(log);
}
