import { NgModule } from '@angular/core';
import { IonicApp, IonicModule} from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ClienteListComponent } from '../pages/clientes/cliente-list.component';
import { ClienteEditarComponent } from '../pages/clientes/cliente-editar.component';
import { ParteListComponent } from '../pages/parte/parte-list.component';
import { ParteEditarComponent } from '../pages/parte/parte-editar.component';
import { VariosService } from '../service/varios.service';
import { ParteService } from '../service/parte.service';
import { ClienteService } from '../service/cliente.service';
import { SettingsService } from '../service/settings.service';
import { SettingsComponent } from '../pages/settings-component/settings-component';
import {SignaturePadModule} from 'angular2-signaturepad';
import {FormBuilder} from '@angular/forms';
import { SQLite } from 'ionic-native';
import {Storage} from '@ionic/storage';
import { DatabaseProvider } from '../provider/database.provider';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParteListComponent,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteEditarComponent,
    SettingsComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: "Atras",
    }),SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteListComponent,
    ParteEditarComponent,
    SettingsComponent
  ],
  providers: [VariosService,ClienteService,ParteService,SQLite,DatabaseProvider,SettingsService,Storage]
})
export class AppModule {
  constructor(){

      }
}
