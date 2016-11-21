import { Component,ViewChild } from '@angular/core';
import { Platform,NavController, MenuController, Nav } from 'ionic-angular';
import { StatusBar, File } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ClienteListComponent } from '../pages/clientes/cliente-list.component';
import { ClienteEditarComponent } from '../pages/clientes/cliente-editar.component';
import { ParteListComponent } from '../pages/parte/parte-list.component';

import { ParteEditarComponent } from '../pages/parte/parte-editar.component';
import { DatabaseProvider } from '../provider/database.provider';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


   rootPage: any;
   pages: any[];


  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, private menu: MenuController, private db: DatabaseProvider) {
    //Seteo pagina inicial
    this.rootPage = HomePage;
    //Seteo rutas para usar en sidemenu
    this.pages=[
        {
            title: "Inicio",
            component: HomePage
          },
          {
            title: "Listado de clientes",
            component: ClienteListComponent
          },
          {
            title: "Listado de partes",
            component: ParteListComponent
          },
        ];

    platform.ready().then(() => {
      console.log(platform.platforms());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      //inicializa la bd creando el fichero de bd pero no la estructura.
      this.db.dbname = "partes1";
      this.db.init();

      //comprobamos si existe el directorio para guardar ficheros necesarios (pdf, imagenes)
      // File.createDir(cordova.file.dataDirectory,"com.goltratec.partestrabajo",false).then(
      //   (ok)=>{
      //     console.log("crear directorio en " + cordova.file.dataDirectory + "com.goltratec.partestrabajo");
      //   },
      //   (err)=>{
      //     console.log("El directorio ya existe");
      //     console.log(err);
      //   }
      // );
    });
  }
  openPage(p){
    this.menu.close();
    console.log(p);
    this.nav.setRoot(p.component);
  }
}
