import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
/**
 * Generated class for the OrdenesDetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {
  b:any;
 detalles:any={};
 orden_id:number=1;
 total:any=0;
  constructor(public _car:CarritoProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.detalles=this.navParams.data.detalle;
    this.orden_id=this.detalles[0].orden_id;
    this.total=this.detalles[0].TOTAL;
    
    console.log(this.orden_id);
  }

  Eliminar_Orden(idx){
    this.b=this._car.Eliminar_Orden(idx);
    if(this.b){
      this.navCtrl.pop();
    }

}
}
