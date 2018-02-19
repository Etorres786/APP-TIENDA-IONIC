import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;

  constructor(private platform:Platform,
              public alertCtrl: AlertController,
              public http: HttpClient,
              private storage: Storage) {

      this.cargar_storage();
  }

  activo():boolean{
    if(this.token){
      return true;
    }else{
      return false;
    }
  }

  ingresar(correo:string, contrasena:string){
   
    let body = {
      correo: correo,
      contrasena: contrasena
    };
 
    let url = URL_SERVICIOS + '/login';
    
    return this.http.post(url,body).map(data_resp=>{
      
      console.log(data_resp);
      
      if (data_resp["error"]){
        this.alertCtrl.create({
          title: 'Error al iniciar',
          subTitle: data_resp["mensaje"],
          buttons: ["OK"]
        }).present();
        console.log("aca ff");
      }else{
        this.token = data_resp["token"];
        this.id_usuario = data_resp["id_usuario"];
        //guardar storage

        this.guardar_storage();
      }
    });
  }


  cerrar_sesion(){
    this.token=null;
    this.id_usuario=null;
    this.guardar_storage();

    if(this.platform.is("cordova")){
        this.storage.remove("items");
    }else{

      localStorage.removeItem("token");
      localStorage.removeItem("id_usuario");
      localStorage.removeItem("items");
    }
  }


  private guardar_storage(){
    if(this.platform.is("cordova")){
      //dispositivo
      this.storage.set('token', this.token);
      this.storage.set('id_usuario', this.id_usuario);
    }else{
      //PC
      if(this.token){
        localStorage.setItem("token",this.token);
        localStorage.setItem("id_usuario",this.id_usuario);
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
      }
    }
  }

  cargar_storage(){
    let promesa = new Promise((resolve,reject)=>{
      if(this.platform.is("cordova")){
        //disposicivo
        this.storage.ready()
            .then(()=>{

              this.storage.get("token")
                  .then(token=>{
                    if(token){
                      this.token=token;
                    }
                    resolve();
                  })

                  this.storage.get("id_usuario")
                  .then(id_usuario=>{
                    if(id_usuario){
                      this.id_usuario=id_usuario;
                    }
                    resolve();
                  })
            })
  
      }else{
        //pc
        if(localStorage.getItem("token")){
          //existe items localstorage
          this.token=localStorage.getItem("token");
          this.id_usuario=localStorage.getItem("id_usuario");
          
        }
      }
      resolve();

    });
    return promesa;





  }
}
