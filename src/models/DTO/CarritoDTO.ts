import { Carrito } from "../Carrito";
import { DetalleCarrito } from "../DetalleCarrito";
import { User } from "../User";

export class CarritoDTO{

    constructor(carrito?:Carrito, priceTotal?:number){
        this.id = carrito.id
        this.priceTotal = priceTotal
        this.user = carrito.user
        this.detalleCarrito = carrito.detalleCarrito
    }

    id:number
    priceTotal:number;
    user: User;
    detalleCarrito:DetalleCarrito[];
}

