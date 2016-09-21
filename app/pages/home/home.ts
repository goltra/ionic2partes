import {Component} from '@angular/core';
import {NavController,MenuController} from 'ionic-angular';
import {EmailComposer} from 'ionic-native';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';
import {AboutPage} from '../about/about';


@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [AboutPage]
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
  a(){
    EmailComposer.isAvailable().then(
      (available)=>{
        console.log("disponible");
      },
      (error)=>{
        console.log("no disponible");
      }
    );


  }
}
