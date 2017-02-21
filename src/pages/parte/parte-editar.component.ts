import { Component, ViewChild } from '@angular/core';
import { Parte } from '../../model/parte';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {
    FormsModule,
    FormBuilder,
    FormGroup,
    Validators,
    AbstractControl
} from '@angular/forms';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { ParteListComponent } from './parte-list.component';
import { ParteFotosPage } from './parte-fotos';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Keyboard, Camera } from 'ionic-native';

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
        private parteService: ParteService,
        private _varios: VariosService,
        public alertCtrl: AlertController) {

        let params = _navParams;
        this.parte = new Parte();
        let clienteid: number;

        if (!isNaN(Number(params.get('clienteid'))) && params.get('nombre')) { //para checkear que viene un valor numerico en el parametro
            //este caso siempre se debe dar cuando se trata de un nuevo parte.
            this.nuevo = true;
            clienteid = params.get('clienteid');
            this.parte.nombre = params.get('nombre');
            this.parte.clienteid = clienteid;
            this.parte.fecha = _varios.getNowDateIso();
            this.parte.horaini = this.parte.fecha;
            this.parte.horafin = this.parte.fecha;
            //TODO: Horaini y fecha por defcto la del día
            //Todo: Horafin por defecto la seteada en horaini y no poder poner una inferior
        } else {
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
        let f = this.myForm.value;
        this.parteService.actualizaParte(f, this.fotos);
        this.fotos = [];
        if(goList)
            this._nav.setRoot(ParteListComponent);

    }

    signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 0.5,
        'maxWidth': 2,
        'canvasWidth': 380,
        'canvasHeight': 300,
    };
    drawStart() {
        console.log("comieza a firmar y oculto teclado");
        Keyboard.close();
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
        // will be notified of szimek/signature_pad's onEnd event
        this.firmaImg = this.signaturePad.toDataURL();
        this.myForm.value.firma = this.firmaImg;
        this.onSubmit();
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

    hacerFoto() {
        let options = {
            quality: 70,
            targetWidth: 1024,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        }
        console.log('hacerFoto()');
        Camera.getPicture(options).then(imgB64 => {
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
