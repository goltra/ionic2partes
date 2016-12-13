import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Settings} from '../model/settings';
import {VariosService} from '../service/varios.service';

declare var cordova: any;
declare var platform: any;


@Injectable()

export class SettingsService{
  constructor(public storage: Storage, private v: VariosService){

  }
  getData(){
    console.log("recupera settings")
    let setting: Settings;
    return this.storage.get('settings');
  }

  save(data){
      let newData; 
      let self = this;
      newData= JSON.stringify(data);
      console.log("Guardar settings");
      //data.imagen = "https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg";
      console.log(data);
      
    //  if(data.imagen!="" && data.imagen!=undefined){
    //     //si imagen entonces lo convierto a Base64
    //     this.v.imgToBase64(data.imagen,function(res){
    //           console.log('convierto logo a base64 y guardo en settings.imagenBase64');
    //           data.imagenBase64 = res;
    //           newData= JSON.stringify(data);
    //           console.log("Guardar settings con b64");
    //           console.log(newData);
    //           self.guardar(newData);
    //         },'image/jpeg',100
    //     );
    //     //////////////////////////////
    //   } else {

        newData= JSON.stringify(data);
        console.log("Guardar settings sin b64");
        console.log(newData);
        this.guardar(newData);
    // }


      
   
  }
  private guardar(newData){
    console.log('Settings.service. guardar(newData)');
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
