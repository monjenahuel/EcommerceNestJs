import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/models/User';
import { Producto } from 'src/models/Producto';
import { ProductoService } from './producto.service';
import { Carrito } from 'src/models/Carrito';
import { CarritoDTO } from 'src/models/DTO/CarritoDTO';

@Injectable()
export class CarritoService {
  
  constructor(
    @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>,
    private readonly productoService: ProductoService
    ) {};


  
////////////////////////////////

  async getAllCarritos(): Promise<CarritoDTO[]> {
    const listaDeCarritos: Carrito[] = await this.carritoRepository.find({relations: ['user','detalleCarrito.producto']})
    const listaDeCarritosDTO: CarritoDTO[] = []

    //El forEach no maneja bien las asincronias, por eso se usa for
    for (const carrito of listaDeCarritos) {
      const precioCalculado = await this.calcularPrecioTotal(carrito);
      const carritoDTO = new CarritoDTO(carrito,precioCalculado);
      listaDeCarritosDTO.push(carritoDTO);
    }

    return listaDeCarritosDTO;
  }

  async getCarritoById(id: number): Promise<CarritoDTO>{

    console.log("Arranca getCarritoById", id)

    const carrito = await this.carritoRepository.findOne({relations: ['user','detalleCarrito.producto'], where: {id}});
    let carritoDTO:CarritoDTO;

    console.log("Carrito encontrado: ",carrito)

    
    if(!carrito){
      throw new NotFoundException('Carrito con id inexistente');
    }else{
      console.log("Calculando precio total")
      const priceTotal = await this.calcularPrecioTotal(carrito);
      carritoDTO = new CarritoDTO(carrito,priceTotal);
    }

    console.log("CarritoDTO: ",carritoDTO)

    return carritoDTO
  }

  async createCarrito(carritoDTO: CarritoDTO): Promise<CarritoDTO> {

    const userCarrito: User = carritoDTO.user
    const existentUser: User = await this.userRepository.findOneBy({id: userCarrito.id});

    if(!existentUser){
        throw new BadRequestException("El usuario no existe");
    }
    
    const carritoDeUsuario: Carrito = await this.carritoRepository.findOneBy({user: existentUser})

    if(carritoDeUsuario){
      throw new BadRequestException("El usuario ya posee un carrito")
    }
    
    carritoDTO.priceTotal = await this.calcularPrecioTotal(carritoDTO);

    const carritoEntity = new Carrito()
    carritoEntity.id = carritoDTO.id
    carritoEntity.user = carritoDTO.user
    carritoEntity.detalleCarrito = carritoDTO.detalleCarrito

    this.carritoRepository.save(carritoEntity);
    
    return carritoDTO
  }

  async deleteCarrito(id: number): Promise<Carrito>{
    
    const carrito: Carrito = await this.carritoRepository.findOneBy({id})

    if(!carrito){
      throw new NotFoundException('No existe el id del carrito que desea eliminar')
    }

      return this.carritoRepository.remove(carrito);

  }

  async updateCarrito(id: number, carritoDTO: CarritoDTO): Promise<CarritoDTO>{
    console.log("#1 Arranca updateCarrito")
    
    const carr = await this.carritoRepository.findOne({relations: {user: true, detalleCarrito: true}, where: {id: id}});

    console.log("#2 Carrito encontrado: ",carr)

    if(!carr){
      throw new NotFoundException('No existe el id del carrito que desea modifiar')
    }
    
    //Asigna el valor de la funcion despues de procesarla
    carritoDTO.priceTotal = await this.calcularPrecioTotal(carritoDTO); //Esto puede no tener productos, aca va el del parametro
    carritoDTO.id = carr.id

    const carritoEntity = new Carrito()
    carritoEntity.id = carritoDTO.id
    carritoEntity.user = carritoDTO.user
    carritoEntity.detalleCarrito = carritoDTO.detalleCarrito

    this.carritoRepository.save(carritoEntity);

    return carritoDTO
  }

  //Funcion asincrona que calcula el precio total de los productos sacados DEL REPOSITORIO
  async calcularPrecioTotal(carrito: Carrito): Promise<number> {
    // console.log(carrito)
    //Lista de los id de los productos del carrito
    const listaDeIdDeProducto: number[] = carrito.detalleCarrito.map((e) => e.id)
    const listaDeCantidadesDeProducto: number[] = carrito.detalleCarrito.map((e) => e.cantidad)
    
    const promesas = listaDeIdDeProducto.map(id => this.productoService.getProductoById(id));
    const productos = await Promise.all(promesas);
    let precioTotal: number = 0; 
    
    for (let i = 0; i < productos.length; i++) {
      const producto = productos[i];
      const cantidad = listaDeCantidadesDeProducto[i];
      precioTotal += producto.actualPrice * cantidad;
    }
    return precioTotal;
  };

  //TODO: Funcion para vaciar el carrito despues de una venta



}