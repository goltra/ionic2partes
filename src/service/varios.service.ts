import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common/src/pipes';
import {ToastController} from 'ionic-angular';
import {Network,File} from 'ionic-native';
declare let EXIF;
declare var cordova: any;
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
   /** Función que lista las bd. Solo probado con android.
    * Guardo esta función por si hace falta en el futuro.
    */
   pathDatabasesSqlite(){
	  console.log('ubicación de las bases de datos SQLITE. Solo probado con Android');
	  File.listDir(cordova.file.applicationStorageDirectory,'databases').then(
			(files)=>{
				console.log('applicationStorageDirectory');
				console.log(files);
			},
			(error)=>{
				console.log('error');
				console.log(error);
			}
	  );

  }
   /** Función que recibe la url de una imagen, un función a la que hacer el callback
    * el tipo de imagen y el ancho máximo que debe tener esta.
    * Si es necesario, la función rota la imagen.
    * La función develve al callback la imagen en base64 para poder embeberla donde 
    * sea necesario.
    */
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
            var widthImg;
            var heightImg;
            var rotar: boolean = false;

            //si maxImgWidth <> 0 entonces calculo un factor de redimensión.
            if(maxImgWidth>0){
                console.log("tamaño de la imagen: ancho "  + this.width + " alto " + this.height);
                console.log('redimensiono el canvas con maxImgWidth recibido');
                factor = this.width/maxImgWidth;
                console.log("factor " + factor);
                console.log('dimensiones despues de resize ancho: ' +  this.width/factor + ' - anchura: ' + this.height/factor); 
            }
            widthImg = this.width/factor;
            heightImg = this.height/factor;
            canvas.height=heightImg;
            canvas.width=widthImg;

            EXIF.getData(this,function(){
                var orientation = EXIF.getTag(this,"Orientation");
                console.log("la orientación de la foto es : " + orientation);
                switch(orientation){
                    case 8:
                        console.log('rotar');
                        rotar = true;
                        ctx.translate(canvas.width/2,canvas.height/2);
                        ctx.rotate(90*Math.PI/180);
                        break;
                    case 3:
                        console.log('rotar');
                        rotar = true;
                        ctx.translate(canvas.width/2,canvas.height/2);
                        ctx.rotate(180*Math.PI/180);
                        break;
                    case 6:
                            console.log('rotar');
                        rotar = true;
                        ctx.translate(canvas.width/2,canvas.height/2);
                        ctx.rotate(-90*Math.PI/180);
                        break;
                }
                if(rotar){
                    ctx.drawImage(img, -widthImg/2,-heightImg/2,widthImg,heightImg);
                    dataUrl = canvas.toDataURL(outputformat);
                    base64img=dataUrl;
                    //base64img =  dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
                    callback(base64img);  
                }
            });
            if(!rotar){
                ctx.drawImage(img, 0,0,widthImg,heightImg);   
                dataUrl = canvas.toDataURL(outputformat);
                base64img=dataUrl;
                //base64img =  dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
                callback(base64img);
            }
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