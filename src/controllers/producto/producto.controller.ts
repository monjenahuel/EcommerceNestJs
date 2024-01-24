import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Producto } from 'src/models/Producto';
import { BlueService } from 'src/services/dolarBlue.service';
import { Carrito } from 'src/models/Carrito';
import { ProductoService } from 'src/services/producto.service';

@Controller('product')
export class ProductoController {

    constructor(private readonly productoService: ProductoService) {};

    @Get("/all")
    getAllProductos(): Promise<Producto[]> {
      return this.productoService.getAllProductos();
    }
  
    @Get("/:id")
    getProductoByID(@Param('id') id: number): Promise<Producto>{
      return this.productoService.getProductoById(id)
    }
  
    @Post()
    createProducto(@Body() producto: Producto): Promise<Producto> {
      return this.productoService.createProducto(producto);
    }
  
    @Patch("/:id")
    updateProducto(@Param('id') id: number,@Body() producto: Producto): Promise<Producto>{
      return this.productoService.updateProducto(id,producto);
    }
  
    @Delete("/:id")
    deleteProducto(@Param('id')id: number): Promise<Producto> {
      return this.productoService.deleteProducto(id);
    }
}
