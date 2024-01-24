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
import { dbConfig} from './dbconfig';



@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    TypeOrmModule.forFeature([Producto, Carrito, User,Venta])
  ],
  controllers: [AppController, ProductoController, UserController, CarritoController, VentaController],
  providers: [AppService,BlueService,ProductoService, UserService, CarritoService, VentaService],
})
export class AppModule {}