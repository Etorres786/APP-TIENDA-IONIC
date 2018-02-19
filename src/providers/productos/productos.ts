import { Injectable } from '@angular/core';
import { Http,Response } from '@angular/http';
import { URL_SERVICIOS } from '../../config/url.servicios';
import 'rxjs/add/operator/map'
import { HttpClient,HttpClientModule } from '@angular/common/http';
import {UsuarioProvider} from '../usuario/usuario';
/*
  Generated class for the ProductosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductosProvider {
  pedidos:any[]=[];
  productos:any[]=[];
  pagina:number=0;
  lineas:any[]=[];
  categoria_:any[]=[];
  busqueda:any[]=[];
  

  constructor(public oldhttp:Http,public _user:UsuarioProvider,public httpCli:HttpClient,public http: HttpClient) {
    this.cargar_todos();
    this.cargar_lineas();
    this.cargar_pedidos();
    
  }
   
  cargar_pedidos(){
    let datas:any={};
    let url=`${URL_SERVICIOS}/pedidos/obtener_pedidos/${this._user.token}/${this._user.id_usuario}`;
    this.http.get(url)
             .subscribe( data=>{
               datas=data;
               if(datas.error){
                 //error
                 console.log("Error en carga pedidos");
               }else{
                 this.pedidos=datas.ordenes;
               }
             })
    
  }



  categoria(id:number){
     let datas:any={};
    //SEGUIIR REVISANDO ESTA PARDE DEL CODIGO Q LANZA ERRORES
    let url=URL_SERVICIOS+"/productos/por_tipo/"+id;
    this.http.get(url)
             .subscribe((data)=>{
               datas=data;
               if(datas.error){
                 //problem

               }else{
                 //aca estoy
                 this.categoria_=datas.productos;
                 console.log(this.categoria_, " PRODUCTOS POR CATEGFORIA");
               }

             })

  }

  cargar_lineas(){
    let datas:any={};
    let url=URL_SERVICIOS + "/lineas";
    this.http.get(url)
                .subscribe(data=>{
                  datas=data;
                  if (datas.error){
                    //problem
                  }else{
                    this.lineas=datas.lineas;
                  }
                })
  }
 

  cargar_todos(){
    let datas:any={};
    let promesa = new Promise((resolve ,reject)=>{
      let url=URL_SERVICIOS + "/productos/all/"+ this.pagina;
      this.http.get(url)
          .subscribe( (data) =>{
            datas=data;
          if(datas.error){
            //HAY UN ERROR
          }else{
            this.productos.push(...datas.productos);
            this.pagina +=1;
            console.log(this.productos);
          }
          resolve();

          })



    });
    return promesa;

  }

  buscar_producto( termino:string ){
    let url = `${URL_SERVICIOS}/productos/buscar/${termino}`;
    this.http.get( url )    
            .subscribe((res:any) =>{
             console.log("RESPUESTA",res); 
             this.busqueda=res.productos;
          });
  }
    /*this.http.get('https://api.github.com/users/seeschweiler').subscribe(data => {
    console.log(data);
    this.busqueda=data;
  });*/
}
