import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';



@Component({
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(private navCtrl: NavController,private menu: MenuController) {
    this.menu.enable(true);
  }
  clientelist(){
    this.navCtrl.push(ClienteListComponent);
  }
  clienteedit(){
    this.navCtrl.push(ClienteEditarComponent); 
  }
  
}
