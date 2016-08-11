import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  constructor(private navCtrl: NavController) {

  }
  pulsa(){
    this.navCtrl.push(ClienteListComponent);
  }
}
