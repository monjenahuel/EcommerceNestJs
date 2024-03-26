import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Producto } from 'src/models/Producto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductoService {
  
  constructor(
    @InjectRepository(Producto) private readonly productoRepository: Repository<Producto>
    ) {};


  
////////////////////////////////

  async getAllProductos(): Promise<Producto[]> {
    return await this.productoRepository.find();
  }

  async getProductoById(id: number): Promise<Producto>{

    const producto = await this.productoRepository.findOneBy({id});
    
    if(!producto){
      throw new NotFoundException('Producto con id inexistente');
    }

    return producto
  }

  async createProducto(producto: Producto): Promise<Producto> {

    if(!producto.actualPrice || producto.actualPrice <= 0){
      throw new BadRequestException('El precio del producto no puede ser menor o igual a 0')
    }

    const productoCreado: Producto = this.productoRepository.create(producto);
    return this.productoRepository.save(productoCreado)
  }

  async deleteProducto(id: number): Promise<Producto>{
    
    const producto: Producto = await this.productoRepository.findOneBy({id})

    if(!producto){
      throw new NotFoundException('No existe el id del producto que desea eliminar')
    }

      return this.productoRepository.remove(producto);

  }

  async updateProducto(id: number, producto: Producto): Promise<Producto>{
    
    const prod = await this.productoRepository.findOneBy({id});

    if(!prod){
      throw new NotFoundException('')
    }

    producto.id = prod.id

    return this.productoRepository.save(producto);
  }



}
