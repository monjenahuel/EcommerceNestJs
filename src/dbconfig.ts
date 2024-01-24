import * as dotenv from 'dotenv'

dotenv.config();

export const dbConfig = {
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST as any,
  port:process.env.DB_PORT as any,
  username: process.env.DB_USERNAME as any,
  password: process.env.DB_PASSWORD as any,
  database: process.env.DB_NAME as any,
  autoLoadEntities: true,
  dropSchema: false,
  synchronize: false,
  migrations: [],
  ssl  : {
    // DO NOT DO THIS
    // set up your ca correctly to trust the connection
    rejectUnauthorized: false
  }
}
