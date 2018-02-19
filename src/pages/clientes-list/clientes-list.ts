import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';
/**
 * Generated class for the ClientesListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes-list',
  templateUrl: 'clientes-list.html',
})
export class ClientesListPage {

  constructor(public _cli:ClientesProvider,public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesListPage');
  }
  prueba(){
    console.log("prueba exitosa")
  }

}
