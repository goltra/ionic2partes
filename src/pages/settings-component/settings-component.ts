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
  getCamera(){
    // let imageData: string = "https://dl.dropboxusercontent.com/u/960415/p-selfi.jpg";
    // let self = this;
    // this.v.imgToBase64(imageData,function(res){
    //         self.logo = res;
    //       },'image/jpeg',100);

    let options= {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      correctOrientation: true,
      targetWidth: 100
    }
    this.camera.getPicture(options).then(
      (imageData) => {
          console.log('obteniendo imagen');
          console.log(imageData);
          let self  = this;
          // this.v.imgToBase64(imageData,function(res){
          //   self.logo = res;
          // },'image/jpeg',100);
        }, 
        (err) => {
          console.log("Error al capturar imagen");
          console.log(err);
        }
    );
  }


}
