import { EstadisticasPage } from './../pages/estadisticas/estadisticas';
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { HomePage } from '../pages/home/home';
import { ClienteListComponent } from '../pages/clientes/cliente-list.component';
import { ParteListComponent } from '../pages/parte/parte-list.component';
import { DatabaseProvider } from '../provider/database.provider';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {


  rootPage: any;
  pages: any[];


  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, private menu: MenuController, private db: DatabaseProvider, private statusBar: StatusBar) {
    //Seteo pagina inicial
    this.rootPage = HomePage;
    //Seteo rutas para usar en sidemenu
    this.pages = [
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
      {
        title: "Estadisticas",
        component: EstadisticasPage
      },
    ];

    platform.ready().then(() => {
      console.log(platform.platforms());
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //inicializa la bd creando el fichero de bd pero no la estructura.
      this.db.dbname = "partes1";
      this.db.init();
     
      let sqlcrearfotos: string;
      this.db.query('PRAGMA partes1(telefono2);').then(data=>{console.log(data)},error=>{console.log(error)});
      

      this.db.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, personaContacto TEXT, telefono TEXT, telefono2 TEXT, email TEXT, direccion TEXT, poblacion TEXT, provincia TEXT, cif TEXT, observaciones TEXT;').then(
                    (data)=>{
                        console.log("Crear tabla cliente")
                    },
                    (error)=>{
                        console.log("Error al crear la tabla cliente: ");
                        console.log(error);
                    }

                );

      this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
      (success) => {
        console.log('no existe tabla parte y la creo');
        console.log(success);
      },
      (error) => {
        console.log("Error al crear la tabla parte: " + error);
      }
    );

     
     
    sqlcrearfotos = "CREATE TABLE IF NOT EXISTS fotos (id INTEGER PRIMARY KEY AUTOINCREMENT, parteid INTEGER CONSTRAINT fk_parteid REFERENCES parte (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, base64 TEXT, nombre TEXT)";
    this.db.query(sqlcrearfotos).then(
      success => {
        console.log('no existe tabla foto y la creo');
        console.log(success);
      },
      error => {
        console.log('error al crear tabla fotos');
        console.log(error);
      }
    );


    });
  }
  openPage(p) {
    this.menu.close();
    console.log(p);
    this.nav.setRoot(p.component);
  }
}
