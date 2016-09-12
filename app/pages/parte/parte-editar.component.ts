import {Component, ViewChild} from '@angular/core';
import {Parte} from '../../model/parte';
import {NavController, NavParams} from 'ionic-angular';
import {FirmaComponent} from '../firma/firma.component';
import {ParteListComponent} from './parte-list.component';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import { SignaturePad } from 'angular2-signaturepad';

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
    @ViewChild(SignaturePad) signaturePad: SignaturePad

    constructor(private _nav: NavController, private _navParams: NavParams,
                private fb: FormBuilder, 
                private parteService: ParteService, 
                private  _varios: VariosService){
       let params = _navParams;
       let parte: Parte;
       parte = new Parte(null,null,null);

       let clienteid:number;

       if(!isNaN(Number(params.get('clienteid')))){ //para checkear que viene un valor numerico en el parametro
          //este caso siempre se debe dar cuando se trata de un nuevo parte.
           clienteid =params.get('clienteid');
           parte.clienteid=clienteid;
           parte.fecha=_varios.getNowDateIso();
           parte.horaini=parte.fecha;
           parte.horafin=parte.fecha;
       } else {
           //TODO: Si lo que recibo en los parametros es el parte,entonces lo igualo al objeto parte 
           //para editarlo en el form
           parte = params.data[0];
           //this.signaturePad.fromDataURL('sssss');
           console.log("editar");
       }

       

       this.myForm = this.fb.group({
           'id':[parte.id],
           'clienteid':[parte.clienteid],
           'fecha': [parte.fecha],
           'horaini': [parte.horaini],
           'horafin':[parte.horafin],
           'trabajorealizado':[parte.trabajorealizado],
           'personafirma':[parte.personafirma],
           'firma':[parte.firma],
       });

    }
    cancelar(){
        this._nav.pop();
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
  }
 
  doOnEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmaImg=this.signaturePad.toDataURL();
    this.myForm.value.firma=this.firmaImg;
    
    
  }
} 