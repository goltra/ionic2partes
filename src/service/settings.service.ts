import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Settings} from '../model/settings';

declare var cordova: any;
declare var platform: any;


@Injectable()

export class SettingsService{
  constructor(public storage: Storage){

  }
  getData(){
    console.log("recupera settings")
    let setting: Settings;
    let tmp;
    return this.storage.get('settings');
  }

  save(data){
    let newData = JSON.stringify(data);
    console.log("Guardar settings");
    console.log(data);
    this.storage.set('settings',newData);
  }
  // saveLogo(urlToDownload: string){
  //   let savePath:string;
  //   if(platform.is("android")){
  //     savePath = cordova.file.externalApplicationStorageDirectory;
  //   }
  //   if(platform.is("ios")){
  //     savePath = cordova.file.dataDirectory;
  //   }
  //   //de momento solo admitimos jpg y forzamos el nombre
  //   savePath = savePath + "logo.jpg";
  //   fileTransfer.download(urlToDownload,savePath).then(
  //     (ok)=>{
  //       console.log("Settings.services.saveImage: OK Se ha guardado correctamente el logo desde la url " + urlToDownload + " al directorio " + savePath );
  //     }
  //   ).catch(
  //     (err)=>{
  //       console.log("Settings.services.saveImage: ERR No se pudo guardar el logo desde la url " + urlToDownload + " al directorio " + savePath);
  //     });
  // }
  // getLogo(){
  //   let savePath:string;
  //   if(platform.is("android")){
  //     savePath = cordova.file.externalApplicationStorageDirectory;
  //   }
  //   if(platform.is("ios")){
  //     savePath = cordova.file.dataDirectory;
  //   }
  // }
}
