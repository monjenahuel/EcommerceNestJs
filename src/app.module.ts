import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { BlueService } from './services/dolarBlue.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './models/Producto';
import { ProductoService } from './services/producto.service';
import { Carrito } from './models/Carrito';
import { User } from './models/User';
import { ProductoController } from './controllers/producto/producto.controller';
import { UserController } from './controllers/user/user.controller';
import { CarritoController } from './controllers/carrito/carrito.controller';
import { UserService } from './services/user.service';
import { CarritoService } from './services/carrito.service';
import { Venta } from './models/Venta';
import { VentaController } from './controllers/venta/venta.controller';
import { VentaService } from './services/venta.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'aws-sa-east-1.connect.psdb.cloud',
      port:3306,
      username: 'awfdn5dnkkhmone4kk81',
      password: 'pscale_pw_pSqTeaNIGsS3LMrW984zuza6W768nD9pfHIfOvlukMV',
      database: 'nestjsdatabase',
      autoLoadEntities: true,
      dropSchema: false,
      synchronize: false,
      migrations: [],
      ssl  : {
        // DO NOT DO THIS
        // set up your ca correctly to trust the connection
        rejectUnauthorized: false
      }}),
    TypeOrmModule.forFeature([Producto, Carrito, User,Venta])
  ],
  controllers: [AppController, ProductoController, UserController, CarritoController, VentaController],
  providers: [AppService,BlueService,ProductoService, UserService, CarritoService, VentaService],
})
export class AppModule {}