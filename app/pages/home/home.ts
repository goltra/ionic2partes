import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {

  }
  clientelist(){
    this.navCtrl.push(ClienteListComponent);
  }
  clienteedit(){
    this.navCtrl.push(ClienteEditarComponent); 
  }
}
