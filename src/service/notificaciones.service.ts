import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


declare var cordova: any;
declare var platform: any;


@Injectable()

export class NotificacionesService {
  constructor(public storage: Storage) {

  }
  existeId(id: any): Promise<any> {
    return new Promise((resolve,reject) => {
      this.storage.get('notificaciones').then(tmpdata => {
        console.log(tmpdata);
        if (tmpdata != undefined && tmpdata != null) {
          let ray = JSON.parse(tmpdata);
          let res = ray.find(x => x.id == id)
          console.log('compruebo si la notificacion esta marcda para no mostar');
          console.log(id);
          console.log(res);
          resolve((res==undefined) ? false : true );
        } else {
          console.log('array de notifiaciones es null y no puedo comprobar si la notifiacion esta o no');
          resolve(false);
        }
      }).catch(err=>{
        console.log(err);
        reject(true);
      })
    })

  }
  getData() {
    return this.storage.get('notificaciones');
  }
  save(data) {
    let newData;
    let res = [];


    this.getData().then(tmpdata => {
      if (tmpdata == null) {
        console.log('data null debo crear un array con el dato nuevo');
        res.push(data);
      } else {
        console.log('hay data');
        res = JSON.parse(tmpdata);
        if (!res.some(x => x.id === data.id)) {
          console.log('compruebo si está el id y si no guardo');
          res.push(data);
        } else {
          console.log('el id está y no guardo');
        }

      }

      console.log("Guardar notificaciones");
      newData = JSON.stringify(res);
      this.guardar(newData);
    })

  }

  private guardar(newData) {
    this.storage.set('notificaciones', newData);
  }

}
