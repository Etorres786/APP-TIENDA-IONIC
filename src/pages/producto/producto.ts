import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { URL_IMG } from '../../config/url.servicios';
import { CarritoProvider } from '../../providers/carrito/carrito';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  url:string;
  producto:any={};
  cantidad:number=1;
  subtotal:any;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _car:CarritoProvider) {

    this.producto=this.navParams.data;
    this.url=URL_IMG+this.producto.codigo+'.jpg';
 
  }

  Agregar_(producto){

    //add quantity to object
    
    this.subtotal=this.cantidad*this.producto.precio_compra;
    console.log(this.subtotal," SUBTOTAL");
    this.producto.cantidad=this.cantidad;
    this.producto.subtotal=this.subtotal;
    console.log("agregando",producto)
    this._car.agregar_carrito(producto);
    
  }



}
