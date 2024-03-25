import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/models/Carrito';
import { User } from 'src/models/User';
import { Venta } from 'src/models/Venta';
import { Repository } from 'typeorm';
import { CarritoService } from './carrito.service';
import { DetalleVenta } from 'src/models/DetalleVenta';

@Injectable()
export class VentaService {

    constructor(@InjectRepository(DetalleVenta) private readonly detalleVentaRepository: Repository<DetalleVenta>,
                @InjectRepository(Venta) private readonly ventaRepository: Repository<Venta>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
                private readonly carritoService: CarritoService){
    }

    async getAllVentas(): Promise<Venta[]> {
      console.log("getAllVentas");
        return await this.ventaRepository.find({relations: ['user', 'detalleVenta']});
      }
    
      async getVentaById(id: number): Promise<Venta>{
        console.log("getVentaById: ",id);
    
        const venta = await this.ventaRepository.findOne({relations: ['user', 'detalleVentas', 'detalleVentas.producto'], where: {id: id}});
    
        
        if(!venta){
          throw new NotFoundException('Venta con id inexistente');
        }
    
        return venta
      }
    
      async createVenta(carrito: Carrito, metodoDePago: String): Promise<Venta> {
        //Verificar existencia de carrito y user

        const userCarritoInput: User = carrito.user;
        const userDeLaVenta: User = await this.userRepository.findOneBy({id: userCarritoInput.id, email: userCarritoInput.email, username: userCarritoInput.username});

        const carritoInput: Carrito = carrito;
        const carritoBBDD: Carrito = await this.carritoService.getCarritoById(carritoInput.id);

        if(!userDeLaVenta){
            throw new BadRequestException("Usuario inexistente")
        }

        if(!carritoBBDD){
            throw new BadRequestException("Carrito inexistente")
        }
        if(carritoBBDD.productList.length == 0){
            throw new BadRequestException("Carrito vacio")
        }
        
        const venta = new Venta();
        venta.monto = await this.carritoService.calcularPrecioTotal(carritoBBDD);
        venta.user = userDeLaVenta

        //TODO: Logica del metodo de pago a desarrollar
        venta.metodoDePago = metodoDePago;

        //Creacion de los detalleVenta
        const detallesDeVenta: DetalleVenta[] = [];
        for (const product of carritoBBDD.productList) {
          const detalleVenta = new DetalleVenta();
          detalleVenta.producto = product;
          detalleVenta.precioDeVenta = product.actualPrice;
          detallesDeVenta.push(detalleVenta);
        }

        //Asignacion de los detalleVenta a la venta, se persisten por cascada
        venta.detalleVentas = detallesDeVenta;
  
        return this.ventaRepository.save(venta)
      }
    
      async deleteVenta(id: number): Promise<Venta>{
        console.log("deleteVenta: ",id);
        
        const venta: Venta = await this.ventaRepository.findOneBy({id})
    
        if(!venta){
          throw new NotFoundException('No existe el id del venta que desea eliminar')
        }
    
          return this.ventaRepository.remove(venta);
    
      }
    
      async updateVenta(id: number, venta: Venta): Promise<Venta>{
        console.log("updateVenta: ",id);
        
        const prod = await this.ventaRepository.findOneBy({id});
        if(!prod){
            throw new NotFoundException('No existe el id del venta que desea modificar')
          }
        
        //DESCOMENTAR CUANDO SE ROMPA  
        //const detalleVentaInput: DetalleVenta = venta.detalleVenta;
        //const detalleDeLaVenta: DetalleVenta = await this.detalleVentaRepository.findOneBy({id: detalleVentaInput.id})
    
        //venta.monto = prod.detalleVenta.productList.map(product => product.price).reduce((a, b) => a + b, 0);
        console.log("Monto de venta Actualizado",venta.monto)
        
        venta.id = prod.id
    
        return this.ventaRepository.save(venta);
      }



}
