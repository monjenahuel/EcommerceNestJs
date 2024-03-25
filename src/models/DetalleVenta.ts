import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { Venta } from "./Venta";
import { ProductoHistorico } from "./DTO/ProductoHistorico";

@Entity()
export class DetalleVenta{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @ManyToOne(() => Venta, (venta) => venta.detalleVentas)
    public venta:Venta;

    @ManyToOne(() => Producto, (producto) => producto.detalleVentas)
    public producto:Producto;
    
    @Column()
    public precioDeVenta:number;

}