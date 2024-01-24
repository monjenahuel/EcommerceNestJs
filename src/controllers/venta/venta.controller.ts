import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Venta } from 'src/models/Venta';
import { VentaService } from 'src/services/venta.service';

@Controller('venta')
export class VentaController {

    constructor(private readonly ventaService: VentaService) {};

    @Get("/all")
    getAllVentas(): Promise<Venta[]> {
      return this.ventaService.getAllVentas();
    }
  
    @Get("/:id")
    getVentaByID(@Param('id') id: number): Promise<Venta>{
      return this.ventaService.getVentaById(id)
    }
  
    @Post()
    createVenta(@Body() venta: Venta): Promise<Venta> {
      return this.ventaService.createVenta(venta);
    }
  
    @Patch("/:id")
    updateVenta(@Param('id') id: number,@Body() venta: Venta): Promise<Venta>{
      return this.ventaService.updateVenta(id,venta);
    }
  
    @Delete("/:id")
    deleteVenta(@Param('id')id: number): Promise<Venta> {
      return this.ventaService.deleteVenta(id);
    }
}
