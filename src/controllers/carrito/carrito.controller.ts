import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Carrito } from 'src/models/Carrito';
import { CarritoService } from 'src/services/carrito.service';

@Controller('carrito')
export class CarritoController {
    constructor(private readonly carritoService: CarritoService) {};

    @Get("/all")
    getAllCarritos(): Promise<Carrito[]> {
      return this.carritoService.getAllCarritos();
    }
  
    @Get("/:id")
    getCarritoByID(@Param('id') id: number): Promise<Carrito>{
      return this.carritoService.getCarritoById(id)
    }
  
    @Post()
    createCarrito(@Body() carrito: Carrito): Promise<Carrito> {
      return this.carritoService.createCarrito(carrito);
    }
  
    @Patch("/:id")
    updateCarrito(@Param('id') id: number,@Body() carrito: Carrito): Promise<Carrito>{
      return this.carritoService.updateCarrito(id,carrito);
    }
  
    @Delete("/:id")
    deleteCarrito(@Param('id')id: number): Promise<Carrito> {
      return this.carritoService.deleteCarrito(id);
    }
}
