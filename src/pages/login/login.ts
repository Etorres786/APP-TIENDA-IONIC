import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';

import { UsuarioProvider } from '../../providers/usuario/usuario';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  correo:string="";
  contrasena:string="";
  constructor(public _user:UsuarioProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
  }
  
  ingresar(){
    this._user.ingresar(this.correo,this.contrasena)
        .subscribe(()=>{

          if(this._user.activo){
            this.viewCtrl.dismiss(true);
          }          
        })
  }

}
