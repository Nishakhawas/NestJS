import { Request } from 'express';

export interface CustomRequest extends Request {
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
    locationid: number;
    postby: string;
  };
   ip: string;  
   mac: string;  
}
