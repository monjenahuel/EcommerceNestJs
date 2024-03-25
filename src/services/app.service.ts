import { Injectable } from '@nestjs/common';
import { Producto } from 'src/models/Producto';
import { Carrito } from 'src/models/Carrito';

@Injectable()
export class AppService {
  constructor() {};
  
  getHello(): string {
    return 'Hello World!';
  }

  getMoto(): string {
    return 'Hello Moto!';
  }

}
