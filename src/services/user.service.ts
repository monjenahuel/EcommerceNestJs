import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/models/User';
import { MetadataAlreadyExistsError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrito } from 'src/models/Carrito';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {};


  
////////////////////////////////

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getUserById(id: number): Promise<User>{

    const user = await this.userRepository.findOne({relations: {carrito: true}, where: {id: id}});
    
    if(!user){
      throw new NotFoundException('User con id inexistente');
    }

    return user
  }

  async createUser(user: User): Promise<User> {

    const email = user.email
    const existentUser = await this.userRepository.findOneBy({email});

    if(existentUser){
        throw new BadRequestException("El email ingresado ya pertenece a un usuario");
    }

    const carrito: Carrito = new Carrito();
    user.carrito = carrito;

    const userCreado: User = this.userRepository.create(user);
    return this.userRepository.save(userCreado)
  }

  async deleteUser(id: number): Promise<User>{
    
    const user: User = await this.userRepository.findOneBy({id})

    if(!user){
      throw new NotFoundException('No existe el id del user que desea eliminar')
    }

      return this.userRepository.remove(user);

  }

  async updateUser(id: number, user: User): Promise<User>{
    
    const prod = await this.userRepository.findOneBy({id});

    if(!prod){
      throw new NotFoundException('')
    }

    user.id = prod.id

    return this.userRepository.save(user);
  }



}