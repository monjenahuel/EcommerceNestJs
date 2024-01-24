import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/models/User';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {};

    @Get("/all")
    getAllUsers(): Promise<User[]> {
      return this.userService.getAllUsers();
    }
  
    @Get("/:id")
    getUserByID(@Param('id') id: number): Promise<User>{
      return this.userService.getUserById(id)
    }
  
    @Post()
    createUser(@Body() user: User): Promise<User> {
      return this.userService.createUser(user);
    }
  
    @Patch("/:id")
    updateUser(@Param('id') id: number,@Body() user: User): Promise<User>{
      return this.userService.updateUser(id,user);
    }
  
    @Delete("/:id")
    deleteUser(@Param('id')id: number): Promise<User> {
      return this.userService.deleteUser(id);
    }
}
