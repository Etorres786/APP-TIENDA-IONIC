import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { URL_SERVICIOS } from '../../config/url.servicios';
import { Response } from '@angular/http/src/static_response';
import { AlertController,Platform, ModalController } from 'ionic-angular';
/*
  Generated class for the ClientesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClientesProvider {
  clientes:any[]=[];
  constructor(private alertCtrl:AlertController,public oldhttp:Http,public http: HttpClient) {
    console.log('Hello ClientesProvider Provider'); 
    this.cargar_clientes();
  }

  reistrar_cliente(registro:any){
    console.log(registro,"mierda");

    let url = `${URL_SERVICIOS}/clientes/registrar`;
    this.oldhttp.post(url,registro)
        .map((res:Response)=>{
          return res.json();
        })
        .subscribe((res:any)=>{
          let respuesta=res;
          if(respuesta.error){
           this.alertCtrl.create({
             title:"Error Registro",
             buttons:["Ok"]
           }).present();
           //mostramos error
         }else{
             this.alertCtrl.create({
               title:"Cliente Registrado!",
               subTitle: "Con Éxito!",
               buttons:["Ok"]
             }).present();
         }


        })
                      



  }







  cargar_clientes(){
    let datas:any={};
    let url=URL_SERVICIOS + "/clientes";
    this.http.get(url)
                .subscribe(data=>{
                  datas=data;
                  if (datas.error){
                    //problem
                  }else{
                    console.log(datas);
                    this.clientes=datas.clientes;
                  }
                })
  }
}
