import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { AppService } from '../services/app.service';
import { Producto } from 'src/models/Producto';
import { BlueService } from 'src/services/dolarBlue.service';
import { Carrito } from 'src/models/Carrito';
import { ProductoService } from 'src/services/producto.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly productoService: ProductoService) {};


}
