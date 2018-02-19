import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientesProvider } from '../../providers/clientes/clientes';

/**
 * Generated class for the RegistrarClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-cliente',
  templateUrl: 'registrar-cliente.html',
})
export class RegistrarClientePage {
  Documento:string;
  Nombre:string;
  Apellidos:string;
  Telefono:string;
  Direccion:string;
  Email:string;
  Registro:any[]=[];


  constructor(private _cli:ClientesProvider,public navCtrl: NavController, public navParams: NavParams) {

 
  }



  Registrar(){
    this.Registro.push(this.Documento);
    this.Registro.push(this.Nombre);
    this.Registro.push(this.Apellidos);
    this.Registro.push(this.Telefono);
    this.Registro.push(this.Direccion);
    this.Registro.push(this.Email);
    console.log(this.Registro);

    this._cli.reistrar_cliente(this.Registro);
    this.Documento="";
    this.Nombre="";
    this.Apellidos="";
    this.Telefono="";
    this.Direccion="";
    this.Email="";
    

  }

}
