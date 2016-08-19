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
    /**Funcion que devuelve la fecha actual 
     * return string
     */
   getNowDate(): string{
       let now=new Date();
    
       let dia:number  = now.getDate();
       let mes:number  =now.getMonth()+1;
       let anio:number =now.getFullYear()
       
       return dia + '/' + mes + '/' + anio;
   }
   /**Funcion que devuelve la hora actual 
     * return string
     */
   getNowTime(): string{
       let now=new Date();
       let hora=now.getHours();
       let minutos=now.getMinutes();
       //TODO: la hora y los minutos tienen que ir con dos digitos cada uno.
       return hora+":"+minutos;
   }
    
}