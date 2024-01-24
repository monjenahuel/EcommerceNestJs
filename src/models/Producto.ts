import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Producto{
    @PrimaryGeneratedColumn('increment')
    public id:number

    @Column()
    public name:string

    @Column()
    public stock:number

    @Column()
    public price:number

    @Column()
    public description:string

    @Column()
    public image?:string

}
