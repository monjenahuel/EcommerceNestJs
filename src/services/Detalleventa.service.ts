import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/models/Carrito';
import { User } from 'src/models/User';
import { Venta } from 'src/models/Venta';
import { Repository } from 'typeorm';
import { CarritoService } from './carrito.service';
import { DetalleVenta } from 'src/models/DetalleVenta';

@Injectable()
export class DetalleVentaService {

    constructor(@InjectRepository(DetalleVenta) private readonly detalleVentaRepository: Repository<DetalleVenta>,
                @InjectRepository(Venta) private readonly ventaRepository: Repository<Venta>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
                private readonly carritoService: CarritoService){
    }

    async getAllDetalleVentas(): Promise<DetalleVenta[]> {
      console.log("getAllDetalleVentas");
        return await this.detalleVentaRepository.find({relations: ['venta']});
      }
    
      async getDetalleVentaById(id: number): Promise<DetalleVenta>{
        console.log("getDetalleVentaById: ",id);
    
        const detalleVenta = await this.detalleVentaRepository.findOne({relations: ['venta','productList'], where: {id: id}});
    
        
        if(!detalleVenta){
          throw new NotFoundException('DetalleVenta con id inexistente');
        }
    
        return detalleVenta
      }
    
      async createDetalleVenta(detalleVenta: DetalleVenta): Promise<DetalleVenta> {
        //Verificar existencia de carrito y user

        const VentaInput: Venta = detalleVenta.venta;
        const ventaDelDetalle: Venta = await this.ventaRepository.findOneBy({id: VentaInput.id})

  
        if(!ventaDelDetalle){
            throw new BadRequestException("Venta inexistente")
        }

        const detalleVentaCreado: DetalleVenta = this.detalleVentaRepository.create(detalleVenta);
        return this.ventaRepository.save(detalleVentaCreado)
      }
    
      async deleteDetalleVenta(id: number): Promise<DetalleVenta>{
        console.log("deleteDetalleVenta: ",id);
        
        const detalleVenta: DetalleVenta = await this.detalleVentaRepository.findOneBy({id})
    
        if(!detalleVenta){
          throw new NotFoundException('No existe el id del DetalleVenta que desea eliminar')
        }
    
          return this.detalleVentaRepository.remove(detalleVenta);
    
      }
    
      async updateDetalleVenta(id: number, detalleVenta: DetalleVenta): Promise<DetalleVenta>{
        console.log("updateVenta: ",id);
        
        const detail = await this.detalleVentaRepository.findOneBy({id});
        if(!detail){
            throw new NotFoundException('No existe el id del DetalleVenta que desea modificar')
          }

        const VentaInput: Venta = detalleVenta.venta;
        const ventaDelDetalle: Venta = await this.ventaRepository.findOneBy({id: VentaInput.id})
    
        detalleVenta.id = ventaDelDetalle.id
    
        return this.ventaRepository.save(detalleVenta);
      }



}
