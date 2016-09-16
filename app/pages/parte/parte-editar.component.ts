import {Component, ViewChild} from '@angular/core';
import {Parte} from '../../model/parte';
import {NavController, NavParams} from 'ionic-angular';
import {FirmaComponent} from '../firma/firma.component';
import {ParteListComponent} from './parte-list.component';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import {SignaturePad } from 'angular2-signaturepad';


import {FORM_DIRECTIVES, 
        REACTIVE_FORM_DIRECTIVES,
        FormBuilder,  
        FormGroup,
        Validators, 
        AbstractControl} from '@angular/forms';

@Component({
    templateUrl:'build/pages/parte/parte-editar.component.html',
    directives:[FORM_DIRECTIVES,REACTIVE_FORM_DIRECTIVES,SignaturePad],
    providers:[ParteService],
})

export class ParteEditarComponent{

    public myForm: FormGroup;
    public firmaImg: string;
    private nuevo: boolean;

    parte: Parte;
    @ViewChild(SignaturePad) signaturePad: SignaturePad

    constructor(private _nav: NavController, private _navParams: NavParams,
                private fb: FormBuilder, 
                private parteService: ParteService, 
                private  _varios: VariosService){
       let params = _navParams;
       
       this.parte = new Parte(null,null,null);

       let clienteid:number;


       if(!isNaN(Number(params.get('clienteid')))){ //para checkear que viene un valor numerico en el parametro
          //este caso siempre se debe dar cuando se trata de un nuevo parte.
           this.nuevo=true;
           clienteid =params.get('clienteid');
           this.parte.clienteid=clienteid;
           this.parte.fecha=_varios.getNowDateIso();
           this.parte.horaini=this.parte.fecha;
           this.parte.horafin=this.parte.fecha;
           console.log(this.parte.fechaformato);
       } else {
           this.nuevo=false;
           this.parte = params.data[0];
           console.log("Editando parte con id " + this.parte.id);
       }

       

       this.myForm = this.fb.group({
           'id':[this.parte.id],
           'clienteid':[this.parte.clienteid],
           'fecha': [this.parte.fecha],
           'horaini': [this.parte.horaini],
           'horafin':[this.parte.horafin],
           'trabajorealizado':[this.parte.trabajorealizado],
           'personafirma':[this.parte.personafirma],
           'firma':[this.parte.firma],
       });

    }
    cancelar(){
        this._nav.pop();
    }
    countRows(e){
       console.log('contando lineas');
       let numLineas=e.target.value.split("\n").length;
       e.target.rows = numLineas;
       console.log(e.target);
    }
    onSubmit(){
        let f = this.myForm.value;
        console.log(this.myForm.value);
        this.parteService.actualizaParte(f);

        this._nav.setRoot(ParteListComponent);
    }

    private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 5,
        'canvasWidth': 500,
        'canvasHeight': 300,
        'backgroundColor': 'silver'
    };
 
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    if(this.parte.firma!==null){
        this.signaturePad.fromDataURL(this.parte.firma);
        this.firmaImg=this.parte.firma;
        console.log("asignar firma guardada a canvas");
    }

  }
 
  doOnEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmaImg=this.signaturePad.toDataURL();
    this.myForm.value.firma=this.firmaImg;
    
  }
  aceptaFirma(){
      this.doOnEnd();
  }
} 