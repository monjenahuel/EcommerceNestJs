import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,new ExpressAdapter());
  
  app.enableCors();
  await app.listen(3000);
}
bootstrap();

//TODO: Crear interfaz Angular
