import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";
import { DetalleCarrito } from "./DetalleCarrito";

@Entity()
export class Carrito{
    @PrimaryGeneratedColumn('increment')
    public id:number

    //TODO: Crear DTO para carrito, no tiene sentido persistir priceTotal, es un campo calculado
    // @Column()
    // public priceTotal:number = 0
    
    @OneToOne(() => User, (user) => user.carrito,{nullable: false, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
    @JoinColumn({name: "user_id"}) //Todo: Esto se puede sacar???
    public user: any;
    
    @OneToMany(() => DetalleCarrito, detalleCarrito => detalleCarrito.carrito,{cascade: true})
    public detalleCarrito:DetalleCarrito[];
}