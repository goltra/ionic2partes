import { VersionProPage } from './../pages/version-pro/version-pro';
import { SocialSharing } from '@ionic-native/social-sharing';
import { EmailComposer } from '@ionic-native/email-composer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Keyboard } from '@ionic-native/keyboard';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
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
import { PopupPage } from '../pages/popup/popup';
import { VariosService } from '../service/varios.service';
import { ParteService } from '../service/parte.service';
import { ClienteService } from '../service/cliente.service';
import { SettingsService } from '../service/settings.service';
import { NotificacionesService } from '../service/notificaciones.service';
import { SettingsComponent } from '../pages/settings-component/settings-component';
import {SignaturePadModule} from 'angular2-signaturepad';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { DatabaseProvider } from '../provider/database.provider';
import { ElasticModule } from 'angular2-elastic';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { IonicStorageModule } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

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
    VersionProPage,
    PopupPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
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
    VersionProPage,
    PopupPage,
    SettingsComponent
  ],
  providers: [VariosService,
    ClienteService,
    ParteService,
    EstadisticasService,
    ScreenOrientation,
    EstadisticasProvider,
    SQLite,
    FileTransfer,
    File,
    DatabaseProvider,
    SettingsService,
    NotificacionesService,
    FileTransferObject,
    SocialSharing,
    EmailComposer,
    SplashScreen,
    Camera,
    InAppPurchase2,
    InAppPurchase,
    StatusBar,
    Keyboard,
    NativeStorage,
    IonicStorageModule,
    SQLitePorter,
    {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {
  constructor(){

      }
}
