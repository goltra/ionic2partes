import { Component, ViewChild } from '@angular/core';
import { Parte } from '../../model/parte';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {
    FormBuilder,
    FormGroup,
} from '@angular/forms';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { ParteListComponent } from './parte-list.component';
import { ParteFotosPage } from './parte-fotos';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Keyboard } from '@ionic-native/keyboard';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
    templateUrl: 'parte-editar.component.html',
})


export class ParteEditarComponent {
    public myForm: FormGroup;
    public firmaImg: string;
    private nuevo: boolean;
    parte: Parte;
    public fotos: Array<{ id: number, base64: string, nombre: string }> = [];
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    constructor(private _nav: NavController, private _navParams: NavParams,
        private fb: FormBuilder,
        private camera: Camera,
        private Keyboard: Keyboard,
        private parteService: ParteService,
        private _varios: VariosService,
        public alertCtrl: AlertController) {

        let params = _navParams;
        this.parte = new Parte();
        let clienteid: number;

        if (!isNaN(Number(params.get('clienteid'))) && params.get('nombre')) { //para checkear que viene un valor numerico en el parametro
            //este caso siempre se debe dar cuando se trata de un nuevo parte.
            console.log('Nuevo parte');
            this.nuevo = true;
            clienteid = params.get('clienteid');
            this.parte.nombre = params.get('nombre');
            this.parte.clienteid = clienteid;
            this.parte.fecha = _varios.getNowDateIso();
            this.parte.horaini = this.parte.fecha;
            this.parte.horafin = this.parte.fecha;
        } else {
            console.log('Parte existente');
            this.nuevo = false;
            this.parte = Parte.inicializa(params.data[0]);
        }

        this.myForm = this.fb.group({
            'id': [this.parte.id],
            'clienteid': [this.parte.clienteid],
            'fecha': [this.parte.fecha],
            'horaini': [this.parte.horaini],
            'horafin': [this.parte.horafin],
            'trabajorealizado': [this.parte.trabajorealizado],
            'personafirma': [this.parte.personafirma],
            'firma': [this.parte.firma],
        });


    }
    cancelar() {
        this._nav.pop();
    }
    verFotos(){
        this._nav.push(ParteFotosPage,{parteid: this.parte.id});
    }

    onSubmit(goList: boolean = true) {
        console.log('submit');
        let f = this.myForm.value;
        this.parteService.actualizaParte(f, this.fotos).then((parteid)=>{
            console.log('Guardado, el parte id es ');
            console.log(parteid);
            this.parte.id=parteid;
        });
        this.fotos = [];
        if(goList)
            this._nav.setRoot(ParteListComponent);

    }

    signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor //380 300 //
        'minWidth': 0.5,
        'maxWidth': 2,
        'canvasWidth': 340,
        'canvasHeight': 200,
        'penColor': "rgb(53, 93, 203)"
    };
    drawStart() {
        console.log("comieza a firmar y oculto teclado");
        this.Keyboard.close();
    }
    ngAfterViewInit() {
        // this.signaturePad is now available
        this.signaturePad.options = this.signaturePadOptions; // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        if (this.parte.firma !== null) {
            this.signaturePad.fromDataURL(this.parte.firma);
            this.firmaImg = this.parte.firma;
        }
    }

    doOnEnd() {
        this.firmaImg = this.signaturePad.toDataURL("image/png", 1);
        this.resizeImg(200,this.firmaImg).then(data => { // Le paso un tamaño max de 200px (En el parte pdf tiene un tamaño de 51x30)
            this.myForm.value.firma = data;
            this.onSubmit();
        });
            
        // will be notified of szimek/signature_pad's onEnd event
        // this.firmaImg = this.signaturePad.toDataURL();
        // this.myForm.value.firma = this.firmaImg;
        // this.onSubmit();
    }
    limpiarFirma() {
        this.signaturePad.clear();
    }
    borrarFirma() {
        this.myForm.value.firma = null;
        this.firmaImg = null;
        //inicializo de nuevo el signaturPad, no se porqu tras estar oculto
        //y ponerlo visible el canvas pierde el height y el width
        this.signaturePad.options = this.signaturePadOptions;
        this.signaturePad.clear();
    }
    
    resizeImg(longSideMax, url): Promise<string> {
        return new Promise((resolve, reject) => {
        var tempImg = new Image();
        tempImg.src = url;
        tempImg.onload = function() {
          // Obtiene la relacion de tamaños de la imagen
          var targetWidth = tempImg.width;
          var targetHeight = tempImg.height;
          var aspect = tempImg.width / tempImg.height;
      
          // Calcula el lado mas corto y guarda el "aspec ratio"
          if (tempImg.width > tempImg.height) {
            longSideMax = Math.min(tempImg.width, longSideMax);
            targetWidth = longSideMax;
            targetHeight = longSideMax / aspect;
          }
          else {
            longSideMax = Math.min(tempImg.height, longSideMax);
            targetHeight = longSideMax;
            targetWidth = longSideMax * aspect;
          }
      
          // Creo el canvas
          var canvas = document.createElement('canvas');
          canvas.width = targetWidth;
          canvas.height = targetHeight;
      
          var ctx = canvas.getContext("2d");
          // Cojo la imagen de esquina a esquina y la dibujo
          ctx.drawImage(tempImg, 0, 0, tempImg.width, tempImg.height, 0, 0, targetWidth, targetHeight);
          console.log("Dibujada imagen de "+targetWidth+"x"+targetHeight);
          resolve(canvas.toDataURL("image/png", 1)); // Lo primero indica el tipo de archivo, lo segundo la calidad que va de 0 a 1 (Siendo 0 lo que menos)
        }
        });
        
      }

    hacerFoto() {
        let options = {
            quality: 70,
            targetWidth: 1024,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        }
        console.log('hacerFoto()');
        this.camera.getPicture(options).then(imgB64 => {
            console.log('foto');
            let nomFichero: string = '';
            let alert = this.alertCtrl.create({
                title: 'Indique un nombre para el fichero',
                inputs: [{
                    name: 'nombre',
                    placeholder: 'foto'
                }],
                buttons: [{
                    text: 'Aceptar',
                    handler: data => {
                        nomFichero = (data.nombre.length>0) ? data.nombre : 'Foto' ;
                        console.log('aceptado');
                        if (nomFichero.length > 0) {
                            //el id 0 indica que es una foto nueva
                            imgB64="data:image/jpeg;base64," + imgB64;
                            this.fotos.push({ id: 0, base64: imgB64, nombre: nomFichero });
                            this.onSubmit(false);
                        }
                    }
                },
                {
                    text: 'Cancelar'
                }]
            });
            alert.present();
        },
            error => {
                console.log('error obteniendo foto');
                console.log(error);
            });
    }
}
