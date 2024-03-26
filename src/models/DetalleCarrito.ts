import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";
import { Carrito } from "./Carrito";

@Entity({name: 'detalle_carrito'})
export class DetalleCarrito {
    @PrimaryGeneratedColumn('increment')
    public id: number;
    
    @ManyToOne(() => Carrito, (carrito) => carrito.detalleCarrito,{onDelete: 'CASCADE'})
    public carrito: Carrito;

    @ManyToOne(() => Producto, (producto) => producto.detalleCarrito)
    public producto: Producto;

    @Column({ default: 1 })
    public cantidad: number;
}