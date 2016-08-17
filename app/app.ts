import {Component,ViewChild} from '@angular/core';
import {Platform, ionicBootstrap, NavController, Nav, MenuController} from 'ionic-angular';
import {ClienteListComponent} from './pages/clientes/cliente-list.component';
import {ClienteEditarComponent} from './pages/clientes/cliente-editar.component';
import {VariosService} from './service/varios.service';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {HomePage} from './pages/home/home';



@Component({
  templateUrl: 'build/app.html',
  providers:[VariosService],
})
export class MyApp {

  private rootPage: any;
  private pages: any[];
  @ViewChild(Nav) nav: Nav;
  
  constructor(private platform: Platform,private menu: MenuController) {
    this.rootPage = HomePage;
    this.pages=[
      {
          title: "Inicio",
          component: HomePage
        },
        {
          title: "Listado de clientes",
          component: ClienteListComponent
        },
      ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  openPage(p){
    this.menu.close();
    this.nav.setRoot(p.component);
  }
  
}
ionicBootstrap(MyApp);
