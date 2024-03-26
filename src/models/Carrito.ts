import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";
import { CarritoProducto } from "./CarritoProducto";

@Entity()
export class Carrito{
    @PrimaryGeneratedColumn('increment')
    public id:number

    //TODO: Crear DTO para carrito, no tiene sentido persistir priceTotal, es un campo calculado
    // @Column()
    // public priceTotal:number = 0
    
    @OneToOne(() => User, (user) => user.carrito,{nullable: false})
    @JoinColumn({name: "user_id"}) //Todo: Esto se puede sacar???
    public user: any;
    
    @OneToMany(() => CarritoProducto, carritoProductos => carritoProductos.carrito,{cascade: true, onDelete: 'CASCADE'})
    public carritoProductos:CarritoProducto[];
}