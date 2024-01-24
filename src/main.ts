import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';

import * as dotenv from 'dotenv'



async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,new ExpressAdapter());
  
  //Configura el archivo .env
  dotenv.config();

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
  console.log("Escuchando en el puerto:",process.env.PORT || 3000)
}
bootstrap();

//TODO: Crear interfaz Angular
