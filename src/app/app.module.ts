import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
//STORAGE
import { IonicStorageModule } from '@ionic/storage';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
 
//PIPE
import { ImagenPipe } from '../pipes/imagen/imagen'

import { BuscarPage,TabsPage,HomePage,BuscarClientePage,ClientesListPage,RegistrarClientePage,OrdenesPage,CarritoPage,CategoriasPage,LoginPage,OrdenesDetallePage,PorCategoriasPage,ProductoPage} from '../pages/index.paginas';
import { MyApp } from './app.component';
//servicios
import { CarritoProvider,ProductosProvider,UsuarioProvider } from '../providers/index.providers';
import { ClientesPage } from '../pages/clientes/clientes';
import { ClientesProvider } from '../providers/clientes/clientes';


@NgModule({
  declarations: [
    MyApp,
    ImagenPipe,
    HomePage,
    TabsPage,
    OrdenesPage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesDetallePage
    ,PorCategoriasPage,
    BuscarPage,
    ClientesPage,
    ClientesListPage,
    RegistrarClientePage,
    BuscarClientePage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    TabsPage,
    OrdenesPage,
    CarritoPage,
    CategoriasPage,
    LoginPage,
    OrdenesDetallePage,
     PorCategoriasPage,
     BuscarPage,
     ClientesPage,
     ClientesListPage,
     RegistrarClientePage,
     BuscarClientePage
     
    
    
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarritoProvider,
    ProductosProvider,
    UsuarioProvider,
    ClientesProvider,
  ]
})
export class AppModule {}
