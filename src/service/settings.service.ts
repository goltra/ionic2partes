import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Settings} from '../model/settings';

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
}
