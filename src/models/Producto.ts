import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { DetalleVenta } from "./DetalleVenta"
import { CarritoProducto } from "./CarritoProducto"

@Entity()
export class Producto{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @Column()
    public name:string

    @Column()
    public stock:number

    @Column()
    public actualPrice:number

    @Column()
    public description:string

    @Column()
    public image?:string

    // @OneToMany(() => DetalleVenta, detalleVentas => detalleVentas.producto)
    public detalleVentas:DetalleVenta[];

    @OneToMany(() => CarritoProducto, carritoProductos => carritoProductos.producto)
    public carritoProductos:CarritoProducto[];

}
