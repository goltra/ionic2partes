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
import {SignaturePadModule} from 'angular2-signaturepad';
import {FormBuilder} from '@angular/forms';
import { SQLite } from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';
// import {TextareaAutosize} from '../components/textarea-autosize';
// import {FormsModule, 
//         FormControl,
//         ReactiveFormsModule,
//         FormBuilder,  
//         FormGroup,
//         Validators, 
//         AbstractControl} from '@angular/forms';
// import {FirmaComponent} from '../pages/firma/firma.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ParteListComponent,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteEditarComponent,
  ],
  imports: [
    IonicModule.forRoot(MyApp),SignaturePadModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClienteListComponent,
    ClienteEditarComponent,
    ParteListComponent,
    ParteEditarComponent,
  ],
  providers: [VariosService,ClienteService,ParteService,SQLite,DatabaseProvider]
})
export class AppModule {
  constructor(){
    
      }
}
