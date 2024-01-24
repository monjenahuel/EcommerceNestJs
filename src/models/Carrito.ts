import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Producto } from "./Producto";
import { User } from "./User";

@Entity()
export class Carrito{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @ManyToMany(() => Producto)
    @JoinTable()
    public productList:Producto[];

    @Column()
    public priceTotal:number = 0

    
    //TODO Carrito deberia ser un One to One?
    @OneToOne(() => User, (user) => user.carrito,{nullable: false})
    @JoinColumn({name: "user_id"}) //Todo: Esto se puede sacar???
    public user: User;

}