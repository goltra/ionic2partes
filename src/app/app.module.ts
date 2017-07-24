import { EstadisticasService } from './../service/estadisticas.service';
import { EstadisticasPage } from './../pages/estadisticas/estadisticas';
import { EstadisticasProvider } from './../provider/estadisticas.provider';
import { NgModule,ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule,IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClienteListComponent } from '../pages/clientes/cliente-list.component';
import { ClienteEditarComponent } from '../pages/clientes/cliente-editar.component';
import { ParteListComponent } from '../pages/parte/parte-list.component';
import { ParteEditarComponent } from '../pages/parte/parte-editar.component';
import { ParteFotosPage } from '../pages/parte/parte-fotos';
import { VariosService } from '../service/varios.service';
import { ParteService } from '../service/parte.service';
import { ClienteService } from '../service/cliente.service';
import { SettingsService } from '../service/settings.service';
import { SettingsComponent } from '../pages/settings-component/settings-component';
import {SignaturePadModule} from 'angular2-signaturepad';
import { SQLite } from 'ionic-native';
import {Storage} from '@ionic/storage';
import { DatabaseProvider } from '../provider/database.provider';
import { ElasticModule } from 'angular2-elastic';
import { ScreenOrientation } from '@ionic-native/screen-orientation';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParteListComponent,
    ParteFotosPage,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteEditarComponent,
    SettingsComponent,
    EstadisticasPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: "Atras",
    }),SignaturePadModule, ElasticModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteListComponent,
    ParteFotosPage,
    ParteEditarComponent,
    EstadisticasPage,
    SettingsComponent
  ],
  providers: [VariosService,
    ClienteService,
    ParteService,
    EstadisticasService,
    ScreenOrientation,
    EstadisticasProvider,
    SQLite,DatabaseProvider,
    SettingsService,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  constructor(){

      }
}
