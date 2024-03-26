import { Carrito } from "../Carrito";
import { CarritoProducto } from "../CarritoProducto";
import { User } from "../User";

export class CarritoDTO{

    constructor(carrito?:Carrito, priceTotal?:number){
        this.id = carrito.id
        this.priceTotal = priceTotal
        this.user = carrito.user
        this.carritoProductos = carrito.carritoProductos
    }

    id:number
    priceTotal:number;
    user: User;
    carritoProductos:CarritoProducto[];
}

