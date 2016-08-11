import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {ClienteListComponent} from './pages/clientes/cliente-list.component';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';



@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  directives: [ClienteListComponent]
})
export class MyApp {

  private rootPage: any;
  private clienteList: any;
  constructor(private platform: Platform) {
    this.rootPage = TabsPage;
    this.clienteList = ClienteListComponent;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
