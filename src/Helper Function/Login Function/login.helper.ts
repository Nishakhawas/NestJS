import * as moment from 'moment';
import { Nepequengdate } from "../Date/nepequengdate.entity";
import { LoginActivity } from "./login.entity";
import { Repository } from "typeorm";

interface LoginActivityPayload {
  loginuserid: number;
  loginuseremail: string;
  logintime?: string;
  loginip?: string;
  loginmac?: string;
  isvalidlogin?: boolean;
  locationid?: string;
}
  
// export async function saveLoginActivity(
//   loginRepo: Repository<LoginActivity>,
//   data: LoginActivityPayload,
//   dateRepo: Repository<Nepequengdate>
// ): Promise<void> {
//   const adDate = moment().format('YYYY/MM/DD');
//   const time = moment().format('HH:mm:ss');
//   // Look up BS date from DB
//   const dateMatch = await dateRepo.findOne({ where: { addate: adDate } });
//   const bsDate = dateMatch?.bsdate || null;

//   // Convert AD date to BS date
//   const log = loginRepo.create({
//       loginuserid: data.loginuserid,
//       loginuseremail: data.loginuseremail,
//       logindatead: adDate,
//       logindatebs: bsDate ?? '',
//       logintime: time,
//       loginip: data.loginip,
//       loginmac: data.loginmac,
//       isvalidlogin: data.isvalidlogin || false,
//       locationid: data.locationid,
//   });

//   await loginRepo.save(log);
// }


export async function saveLoginActivity(
  loginRepo: Repository<LoginActivity>,
  data: LoginActivityPayload,
  dateRepo: Repository<Nepequengdate>
): Promise<void> {
  try {
    const adDate = moment().format('YYYY/MM/DD');
    const time = moment().format('HH:mm:ss');
    const dateMatch = await dateRepo.findOne({ where: { addate: adDate } });
    const bsDate = dateMatch?.bsdate || '';

    const log = loginRepo.create({
      loginuserid: data.loginuserid,
      loginuseremail: data.loginuseremail,
      logindatead: adDate,
      logindatebs: bsDate,
      logintime: time,
      loginip: data.loginip,
      loginmac: data.loginmac,
      isvalidlogin: data.isvalidlogin || false,
      locationid: data.locationid,
    });

    console.log('Saving login activity:', log);

    await loginRepo.save(log);
    const logs = await loginRepo.find({
      order: { id: 'DESC' },
      take: 5,
    });
    console.log('Latest login activities:', logs);

    console.log('Login activity saved successfully!');
  } catch (error) {
    console.error('Failed to save login activity:', error);
  }
}

    

  

