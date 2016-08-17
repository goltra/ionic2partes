import {Injectable} from '@angular/core';
import {ToastController} from 'ionic-angular';

@Injectable()

export class VariosService{

    constructor(private toastCtrl: ToastController){

    }
    showToast(mensaje: string, posicion: string) {
        let toast = this.toastCtrl.create({
        message: mensaje,
        position:posicion,
        cssClass: 'toastError',
        duration: 2000
        });
        toast.present();
   }
    
}