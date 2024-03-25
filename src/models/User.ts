import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Carrito } from "./Carrito";

@Entity()
export class User{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @Column({nullable: false})
    public username:string;

    @Column({nullable: false})
    public password:string;

    @Column({nullable: false, unique: true})
    public email: string;

    @OneToOne(() => Carrito, (carrito) => carrito.user)
    public carrito: Carrito;

}