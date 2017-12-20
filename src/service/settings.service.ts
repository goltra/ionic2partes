import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { VariosService } from '../service/varios.service';

declare var cordova: any;
declare var platform: any;


@Injectable()

export class SettingsService {
  constructor(public storage: Storage, private v: VariosService) {

  }
  getData() {
    console.log("recupera settings")
    return this.storage.get('settings');
  }

  save(data) {
    let newData;
    
    newData = JSON.stringify(data);
    console.log("Guardar settings sin b64");
    console.log(newData);
    this.guardar(newData);
  }
  private guardar(newData) {
    console.log('Settings.service. guardar(newData)');
    this.storage.set('settings', newData);
  }

}
