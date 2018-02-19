import { HttpClient } from '@angular/common/http';
import {URLSearchParams,Http, Response, RequestOptions, Headers} from '@angular/http';
import { Injectable } from '@angular/core';
import {  URL_SERVICIOS } from '../../config/url.servicios';
import { AlertController,Platform, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

//USUARIO PROVIDER
import { UsuarioProvider } from '../usuario/usuario';
//pages of modal
import { LoginPage,CarritoPage } from '../../pages/index.paginas'


@Injectable()
export class CarritoProvider {
  ordenes:any[] = [];
  items:any[]=[];
  constructor(
              private modalCtrl:ModalController,
              private _user:UsuarioProvider,
              private storage: Storage,
              public http: HttpClient,
              public oldHttp: Http,
              private alertCtrl:AlertController,
              private platform:Platform) {

    this.cargar_storage(); 
    
  }


  cargar_ordenes(){

    let url =`${ URL_SERVICIOS }/pedidos/obtener_pedidos/${ this._user.token }/${ this._user.id_usuario }`;

    this.oldHttp.get( url )
              .map( (resp:Response) => resp.json() )
              .subscribe( data =>{

            if( data.error ){
              // manejar el error
            }else{

              this.ordenes = data.ordenes;
              console.log(data,"REVISA ACA CANTI DE CAVBTI");

            }

        })


  }


  eliminar_item(idx:number){
    this.items.splice(idx,1);
    this.guardar_storage();
  }




  ver_carro(){

    let modal:any;
    if( this._user.token){
      //show cart
      modal=this.modalCtrl.create(CarritoPage);
    }else{
      //show login
      modal=this.modalCtrl.create(LoginPage);
    }
    modal.present();
    modal.onDidDismiss((abrirCarrito:boolean)=>{
      if(abrirCarrito){
        this.modalCtrl.create(CarritoPage).present();
      }
    })
  }

  Eliminar_Orden(idx:number){
    let url=`${URL_SERVICIOS}/pedidos/borrar_pedido/${this._user.token}/${this._user.id_usuario}/${idx}`;
    return  this.oldHttp.delete(url)
             .map((res:Response)=>{
              return res.json();
              })
              .subscribe((res:any)=>{
                let respuesta=res;
                if(respuesta.error){
                  this.alertCtrl.create({
                    title:"Error Al Eliminar Orden",
                    buttons:["Ok"]
                  }).present();
                  return false;
                  //mostramos error
                }else{
                    this.items=[];
                    this.alertCtrl.create({
                      title:"Orden Eliminada!",
                      buttons:["Ok"]
                    }).present();
                    return true;

                }
              })
  }

  realizar_pedido(tota:any){
     let data = new URLSearchParams();
     let item_pedido:string[]=[];
     let cantidad:string[]=[];
     let subtotal:string[]=[];
     let precio_compra:string[]=[];
     let total=tota;

    for(let item of this.items){
        item_pedido.push(item.codigo);
        cantidad.push(item.cantidad);
        subtotal.push(item.subtotal);
        precio_compra.push(item.precio_compra);
        

    }
    data.set("valor",precio_compra.join(","));
    data.set("subtotal",subtotal.join(","));
    data.set("cantidad",cantidad.join(","));
    data.set("items",item_pedido.join(","));
    data.set("total",total);
   let url = `${URL_SERVICIOS}/pedidos/realizar_orden/${this._user.token}/${this._user.id_usuario}`;
   this.oldHttp.post(url,data)
               .map((res:Response) => {
               return res.json();
   })
       .subscribe( (res: any) => {

       let respuesta=res;
       if(respuesta.error){
        this.alertCtrl.create({
          title:"Error Orden",
          buttons:["Ok"]
        }).present();
        //mostramos error
      }else{
          this.items=[];
          this.alertCtrl.create({
            title:"Orden Realizada!",
            subTitle: "Nos Contactaremos lo antes posible",
            buttons:["Ok"]
          }).present();
      }

   })              
  }

  agregar_carrito(item_parametro:any){
    console.log("IMPRIMIENDO");
    console.log(item_parametro,"DATA IN THE SERVICE CAR");
    for(let item of this.items){

      if(item.codigo == item_parametro.codigo){
        this.alertCtrl.create({
          title:"Item Existe",
          subTitle:item_parametro.producto + ", ya se encuentra en el carrito",
          buttons: ["Ok"]
        }).present();
        return;
      } 
    }
    this.items.push( item_parametro );
    console.log(this.items,"OBJETO DE ITEMS DEL CARRITO");
    this.guardar_storage();

  }


  private guardar_storage(){
    if(this.platform.is("cordova")){
      //dispositivo
      this.storage.set('items', this.items);
    }else{
      //PC
      localStorage.setItem("items",JSON.stringify(this.items));
    }
  }

  cargar_storage(){
    let promesa = new Promise((resolve,reject)=>{
      if(this.platform.is("cordova")){
        //disposicivo
        this.storage.ready()
            .then(()=>{

              this.storage.get("items")
                  .then(data=>{
                    if(data){
                      this.items=data;
                    }
                    resolve();
                  })
            })
  
      }else{
        //pc
        if(localStorage.getItem("items")){
          //existe items localstorage
          this.items=JSON.parse(localStorage.getItem("items"));
        }
      }
      resolve();

    });
    return promesa;





  }


}
