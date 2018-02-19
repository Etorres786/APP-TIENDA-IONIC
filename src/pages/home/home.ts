import { Component } from '@angular/core';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { NavController,NavPush,NavParams } from 'ionic-angular';
import { ProductosProvider } from '../../providers/productos/productos';
import { CarritoProvider } from '../../providers/carrito/carrito';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
              public _ps: ProductosProvider,
              public _car:CarritoProvider,
              public _user:UsuarioProvider) {
                
     
  }
  next_page(infiniteScroll){

   this._ps.cargar_todos()
        .then(()=>{
        infiniteScroll.complete();
   })

  }

  ver_producto(producto:any){
    this.navCtrl.push("ProductoPage",producto)
  }



}
