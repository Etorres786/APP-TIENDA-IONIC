import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';

/**
 * Generated class for the BuscarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {
  searchQuery: string = '';
  items: string[]; 
  itemss:any;
 
  constructor( public _pro:ProductosProvider,private navCtrl:NavController) {
  }
  



  seleccionado(producto:any){
    this.navCtrl.push("ProductoPage",producto)


  }
  buscar_productos(ev: any) {

    let val = ev.target.value;
    console.log(val);
    this._pro.buscar_producto(val);

  }
}