import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/User';
import { Producto } from 'src/models/Producto';
import { ProductoService } from './producto.service';
import { Carrito } from 'src/models/Carrito';

@Injectable()
export class CarritoService {
  
  constructor(
    @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
    private readonly productoService: ProductoService
    ) {};


  
////////////////////////////////

  async getAllCarritos(): Promise<Carrito[]> {
    const listaDeCarritos: Carrito[] = await this.carritoRepository.find({relations: ['user','productList']})

    
    //El forEach no maneja bien las asincronias, por eso se usa for
    for (const carrito of listaDeCarritos) {
      const precioCalculado = await this.calcularPrecioTotal(carrito);
      carrito.priceTotal = precioCalculado;
    }

    return listaDeCarritos;
  }

  async getCarritoById(id: number): Promise<Carrito>{


    const carrito = await this.carritoRepository.findOne({relations: {user: true, productList: true}, where: {id: id}});

    
    if(!carrito){
      throw new NotFoundException('Carrito con id inexistente');
    }else{
      carrito.priceTotal = await this.calcularPrecioTotal(carrito);
    }

    return carrito
  }

  async createCarrito(carrito: Carrito): Promise<Carrito> {

    const userCarrito = carrito.user
    const carritoDeUsuario: Carrito = await this.carritoRepository.findOneBy({user: userCarrito})

    if(carritoDeUsuario){
      throw new BadRequestException("El usuario ya posee un carrito")
    }

    carrito.priceTotal = await this.calcularPrecioTotal(carrito);
    const carritoCreado: Carrito = this.carritoRepository.create(carrito);
    
    return this.carritoRepository.save(carritoCreado)
  }

  async deleteCarrito(id: number): Promise<Carrito>{
    
    const carrito: Carrito = await this.carritoRepository.findOneBy({id})

    if(!carrito){
      throw new NotFoundException('No existe el id del carrito que desea eliminar')
    }

      return this.carritoRepository.remove(carrito);

  }

  async updateCarrito(id: number, carrito: Carrito): Promise<Carrito>{
    
    const carr = await this.carritoRepository.findOne({relations: {user: true, productList: true}, where: {id: id}});

    if(!carr){
      throw new NotFoundException('No existe el id del carrito que desea modifiar')
    }
    
    //Asigna el valor de la funcion despues de procesarla
    carrito.priceTotal = await this.calcularPrecioTotal(carr);
    carrito.id = carr.id

    return this.carritoRepository.save(carrito);
  }

  //Funcion asincrona que calcula el precio total de los productos sacados DEL REPOSITORIO
  async calcularPrecioTotal(carrito: Carrito) {
    //Lista de los id de los productos del carrito
    const listaDeIdDeProducto: number[] = carrito.productList.map((e) => e.id)
    
    const promesas = listaDeIdDeProducto.map(id => this.productoService.getProductoById(id));
    const productos = await Promise.all(promesas);
    const precioTotal = productos.reduce((sum, i) => {
      return sum + i.actualPrice;
    }, 0);
    return precioTotal;
  };

  //TODO: Funcion para vaciar el carrito despues de una venta



}