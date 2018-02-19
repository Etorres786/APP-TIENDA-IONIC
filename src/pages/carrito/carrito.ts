import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/index.providers';

@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {
  total:number=0;
  items_Carrito:any []=[];
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _car:CarritoProvider,
              public viewCtrl:ViewController
            ) {

         for(let producto of this._car.items){
            this.total=(this.total + Number(producto.subtotal));

         }    
  }
  
  eliminar_item(i:number){
    this.total=this.total- Number(this._car.items[i].precio_compra);
    this._car.eliminar_item(i);

  }

}
