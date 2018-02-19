import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  ProductosProvider } from '../../providers/index.providers';
import { PorCategoriasPage } from '../por-categorias/por-categorias';
/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  porCategorias =PorCategoriasPage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _ps:ProductosProvider) {


  }



}
