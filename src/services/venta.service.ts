import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/models/Carrito';
import { User } from 'src/models/User';
import { Venta } from 'src/models/Venta';
import { Repository } from 'typeorm';
import { CarritoService } from './carrito.service';

@Injectable()
export class VentaService {

    constructor(@InjectRepository(Venta) private readonly ventaRepository: Repository<Venta>,
                @InjectRepository(User) private readonly userRepository: Repository<User>,
                @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
                private readonly carritoService: CarritoService){
    }

    async getAllVentas(): Promise<Venta[]> {
      console.log("getAllVentas");
        return await this.ventaRepository.find({relations: ['user', 'carrito.productList']});
      }
    
      async getVentaById(id: number): Promise<Venta>{
        console.log("getVentaById: ",id);
    
        const venta = await this.ventaRepository.findOne({relations: ['user', 'carrito.productList'], where: {id: id}});
    
        
        if(!venta){
          throw new NotFoundException('Venta con id inexistente');
        }
    
        return venta
      }
    
      async createVenta(venta: Venta): Promise<Venta> {
        console.log("createVenta: ", venta);
        //Verificar existencia de carrito y user

        const userVentaInput: User = venta.user;
        const userDeLaVenta: User = await this.userRepository.findOneBy({id: userVentaInput.id, email: userVentaInput.email, username: userVentaInput.username})

        const carritoVentaInput: Carrito = venta.carrito;
        const carritoDeLaVenta: Carrito = await this.carritoRepository.findOne({relations: {user: true, productList: true}, where:{id: carritoVentaInput.id}});
  
    
        if(!userDeLaVenta){
            throw new BadRequestException("Usuario inexistente")
        }

        if(!carritoDeLaVenta){
            throw new BadRequestException("Carrito inexistente")
        }
        
        // if(userDeLaVenta !== userVentaInput){
        //     console.log("Input:",userVentaInput)
        //     console.log("Repository:",userDeLaVenta)
        //     throw new BadRequestException("Datos del usuario incorrectos")
        // }

        // if(carritoVentaInput != carritoDeLaVenta){
        //     throw new BadRequestException("Datos del carrito incorrectos")
        // }

        console.log("Test1",carritoDeLaVenta)
        venta.monto = await this.carritoService.calcularPrecioTotal(carritoDeLaVenta);

        const ventaCreado: Venta = this.ventaRepository.create(venta);
        return this.ventaRepository.save(ventaCreado)
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
        console.log("Recuperado venta del repo")

        const carritoVentaInput: Carrito = venta.carrito;
        const carritoDeLaVenta: Carrito = await this.carritoRepository.findOneBy({id: carritoVentaInput.id})
    
        venta.monto = await this.carritoService.calcularPrecioTotal(carritoDeLaVenta);
        venta.id = prod.id
    
        return this.ventaRepository.save(venta);
      }



}
