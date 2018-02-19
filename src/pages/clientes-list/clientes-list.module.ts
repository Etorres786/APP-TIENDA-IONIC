import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientesListPage } from './clientes-list';

@NgModule({
  declarations: [
    ClientesListPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientesListPage),
  ],
})
export class ClientesListPageModule {}
