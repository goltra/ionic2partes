import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common/src/pipes';
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
   imgToBase64(url: string,callback,outputformat='image/jpeg',maxImgWidth: number=0){
        //Declaración del  evento cuando seteamos la url del objeto Image 
        console.log('imgToBase64');
        let img = new Image();
        let base64img:string;

        img.crossOrigin = 'anonymous';
        img.onload=function(){
            console.log('img.onload');
            console.log(outputformat);
            var factor:number = 1;
            var canvas = <HTMLCanvasElement>document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataUrl: string;
            canvas.height=this.height;
            canvas.width=this.width;
            //si maxImgWidth <> 0 entonces calculo un factor de redimensión.
            if(maxImgWidth>0){
                console.log('redimensiono el canvas con maxImgWidth recibido');
                factor = canvas.width/maxImgWidth;
                console.log("factor " + factor);
                console.log('dimensiones antes de resize altura: ' +  this.height + ' - anchura: ' + this.width);
                // this.height = this.height/factor;
                // this.width = this.width/factor;
                canvas.height=this.height;
                canvas.width=this.width;
                console.log('dimensiones despues de resize altura: ' +  Math.round(this.height/factor) + ' - anchura: ' + Math.round(this.width/factor)); 
            }

            //ctx.drawImage(this,0,0,Math.round(this.width/factor),Math.round(this.height/factor));
            //ctx.scale(0.2,0.2);
            ctx.drawImage(this,0,0);
            dataUrl = canvas.toDataURL(outputformat);
            base64img=dataUrl;
            //base64img =  dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
            callback(base64img);
        }
        /////////////////////////////////////////////////////////////////////
        img.src = url;

   }
    /**Funcion que devuelve la fecha actual con el formato ISO.
     * Tras varias pruebas deduzco que el formato ISO no incluye la zona hoario por lo que siempre va a dar
     * la hora sin incrementar ni decrementar por zonas. Por ese motivo se obtiene a parte el timezoneOffset
     * y se suma a los minutos para finalmente devolver en formato ISO.
     * Se usa el formato iso porque hay componentes de formularios de ionic (ion-datatime) que lo necesitan.
     * return string
     */
   getNowDateIso(): string{
       let now=new Date();
       let timezoneOffset=(now.getTimezoneOffset() * -1);
       let fechastr=new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes()+timezoneOffset);
       console.log(fechastr);
         
       return fechastr.toISOString();
   }
   getNowDate(){
       let now = new Date().toLocaleDateString();
       return now.toString();
   }

 /**DE MOMENTON O SE USA PERO LA DEJO POR SI ACASO
  * Funcion que devuelve la hora actual con el formato parsado en el 
    * pattenr. Por defecto es HH:mm 21:00
     * return string
     */
/**   getNowTime(pattern='HH:mm'): string{
       let now=new Date();
       let hora= new DatePipe();
       let horastr = hora.transform(now,pattern);

       return horastr;
   }
    */  

}