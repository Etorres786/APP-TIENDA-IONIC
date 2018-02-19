import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { URL_SERVICIOS } from '../../config/url.servicios';
import { ProductosProvider } from '../../providers/productos/productos';
import { ProductoPage } from '../index.paginas';
@IonicPage()
@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {
  categoria:any={};
  productos:any[]=[];
  productoPage=ProductoPage;
  
  constructor(private _ps:ProductosProvider,public navCtrl: NavController, public navParams: NavParams) {

    this.categoria=this.navParams.get("categoria");
    this._ps.categoria(this.categoria.id);

  }

  Producto(producto){
      this.navCtrl.push("ProductoPage",producto);
  }

}
