import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {ClienteListComponent} from './pages/clientes/cliente-list.component';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';



@Component({
  templateUrl: 'build/app.html',
  directives: [ClienteListComponent]
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp);
