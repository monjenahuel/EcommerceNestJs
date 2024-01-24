import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Carrito } from "./Carrito";

@Entity()
export class Venta{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @ManyToOne(() => User, (user) => user.carrito,{nullable: false})
    @JoinColumn({name: "user_id"})
    public user: User;
    
    
    //TODO Esto deberia ser una lista de productos o un carrito? ventaDetalles
    //TODO: Como hago que recuerde los precios viejos? Crear entidad VentaDetalle -> Con atributo precioDeVenta
    @ManyToOne(() => Carrito,{nullable: false})
    @JoinColumn({name: "carrito_id"})
    public carrito:Carrito;

    @Column()
    public monto:number;

    @Column()
    public metodoDePago:String;

}