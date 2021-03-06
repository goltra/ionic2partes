import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';
import { VariosService } from '../../service/varios.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
var f: any;
declare var cordova: any;
/*
  Generated class for the SettingsComponent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings-component',
  templateUrl: 'settings-component.html'
})
export class SettingsComponent {
  settings: Settings;
  versionPro: boolean;
  serie:string;
  logo: string;
  path: string;

  constructor(public navCtrl: NavController, private s: SettingsService, private v: VariosService,private platform: Platform, private camera: Camera, private transfer: FileTransfer, private file: File) {
    this.logo = "";
  }
  

  ionViewDidLoad() {
    this.platform.ready().then(
      (ok)=>{
          console.log("inicializo FileTransfer");
          if(this.platform.is('cordova')){
            console.log('cordova');
            f = this.transfer.create();
          }
      },
      (err)=>{
          console.log("Error al inicalizar FileTransfer");
      }
    );
    if(this.platform.is('android')){
      this.path = cordova.file.externalDataDirectory;
    }
    if(this.platform.is('ios')){ 
      this.path = cordova.file.dataDirectory;
    }
    this.path = this.path +  'logo' + (Math.random()*10).toString() + '.jpg';
  }
  ionViewCanEnter(){
    //Aunque el método estatico inicializa devuelve un objeto de tipo Settigs,
    //creo el objeto y llamo al constructor para que debido al asyncronismo
    //no sea null en cas de cargar el formulario antes de haber devuelto el objeto
    this.settings=new Settings();
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      this.serie = this.settings.serie;
      this.logo = this.settings.imagenBase64;
      this.versionPro = this.settings.versionPro;
      console.log(this.settings);
    });
  }
  submitForm(){
    console.log("Guardando settings");
    this.settings.imagen=this.logo;
    this.settings.imagenBase64=this.logo;
    console.log(this.settings);
    this.s.save(this.settings);
    this.v.showToast("Configuración Guardada","top");
    this.navCtrl.pop();
  }
  removeImage(){
    this.logo = "";
  }

  usarioPro(){
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      return this.settings.versionPro;
    });}

  getCamera(){

    let options= {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      targetWidth: 200,
      targetHeight: 140
    }
    this.camera.getPicture(options).then(
      (imageData) => {
          console.log('obteniendo imagen');
          console.log(imageData);
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          this.settings.imagen = imageData;
          this.settings.imagenBase64 = base64Image;
          this.s.save(this.settings);
          this.logo = this.settings.imagenBase64;
          this.v.showToast("Logo cargado","top");
          //this.navCtrl.pop();
        }, 
        (err) => {
          console.log("Error al capturar imagen");
          console.log(err);
        }
    );
  }


}
