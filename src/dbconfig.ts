import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm';

dotenv.config();

export const dbConfig = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST as any,
  port:process.env.DB_PORT as any,
  username: process.env.DB_USERNAME as any,
  password: process.env.DB_PASSWORD as any,
  database: process.env.DB_NAME as any,
  autoLoadEntities: true, //Sacar?
  dropSchema: false,
  synchronize: true,
  migrations: []//,
  // ssl  : {
  //   rejectUnauthorized: false
  // }
}
