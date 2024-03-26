import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";

@Entity()
export class DetalleVenta{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @ManyToOne(() => Venta, (venta) => venta.detalleVenta)
    public venta:Venta;

    @ManyToOne(() => Producto, (producto) => producto.detalleVenta)
    public producto:Producto;
    
    @Column()
    public precioDeVenta:number;

    @Column()
    public cantidad:number;

}