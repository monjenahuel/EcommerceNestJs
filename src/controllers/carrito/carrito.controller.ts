import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Carrito } from 'src/models/Carrito';
import { CarritoDTO } from 'src/models/DTO/CarritoDTO';
import { CarritoService } from 'src/services/carrito.service';

@Controller('carrito')
export class CarritoController {
    constructor(private readonly carritoService: CarritoService) {};

    @Get("/all")
    getAllCarritos(): Promise<CarritoDTO[]> {
      return this.carritoService.getAllCarritos();
    }
  
    @Get("/:id")
    getCarritoByID(@Param('id') id: number): Promise<CarritoDTO>{
      return this.carritoService.getCarritoById(id)
    }
  
    @Post()
    createCarrito(@Body() carrito: CarritoDTO): Promise<CarritoDTO> {
      return this.carritoService.createCarrito(carrito);
    }
  
    @Patch("/:id")
    updateCarrito(@Param('id') id: number,@Body() carrito: CarritoDTO): Promise<CarritoDTO>{
      return this.carritoService.updateCarrito(id,carrito);
    }
  
    @Delete("/:id")
    deleteCarrito(@Param('id')id: number): Promise<Carrito> {
      return this.carritoService.deleteCarrito(id);
    }
}
