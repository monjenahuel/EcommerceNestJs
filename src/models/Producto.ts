import { Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { DetalleVenta } from "./DetalleVenta"

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

    @OneToMany(() => DetalleVenta, detalleVentas => detalleVentas.producto)
    public detalleVentas:DetalleVenta[];

}
