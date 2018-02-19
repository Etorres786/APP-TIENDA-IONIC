import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrdenesDetallePage } from '../ordenes-detalle/ordenes-detalle';
import { CarritoProvider } from '../../providers/carrito/carrito';
/**
 * Generated class for the OrdenesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {
  pagDetalle:any;

  constructor(public _cs:CarritoProvider) {
        this.pagDetalle=OrdenesDetallePage;
  }
  

  ionViewWillEnter() {
    console.log("cargando ordenes");
    this._cs.cargar_ordenes();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrdenesPage');
  }


 
}
