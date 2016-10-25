import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ParteListComponent} from '../parte/parte-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';
import {VariosService} from '../../service/varios.service';



@Component({
  templateUrl: 'home.html',
})
export class HomePage {
  public dia: string; 
  constructor(private navCtrl: NavController,private menu: MenuController, v: VariosService) {
    this.menu.enable(true);
    this.dia  = v.getNowDate();
  }
  
  clientelist(){
    this.navCtrl.push(ClienteListComponent);
  }
  partelist(){
    this.navCtrl.push(ParteListComponent);
  }
  clienteedit(){
    this.navCtrl.push(ClienteEditarComponent); 
  }
  
}
