import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Carrito } from "./Carrito";
import { DetalleVenta } from "./DetalleVenta";

@Entity()
export class Venta{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @ManyToOne(() => User, (user) => user.carrito,{nullable: false})
    @JoinColumn({name: "user_id"})
    public user: User;

    @OneToMany(() => DetalleVenta, detalleVenta => detalleVenta.venta,{cascade: true})
    public detalleVenta:DetalleVenta[];

    @Column()
    public monto:number;

    @Column()
    public metodoDePago:String;


}