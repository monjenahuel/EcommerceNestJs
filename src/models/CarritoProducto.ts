import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";
import { Carrito } from "./Carrito";

@Entity({name: 'carrito_producto'})
export class CarritoProducto {
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @ManyToOne(() => Carrito, (carrito) => carrito.carritoProductos,{onDelete: 'CASCADE'})
    public carrito: Carrito;

    @ManyToOne(() => Producto, (producto) => producto.carritoProductos)
    public producto: Producto;

    @Column({ default: 1 })
    public cantidad: number;
}