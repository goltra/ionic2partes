import {Component} from '@angular/core';
import {Parte} from '../../model/parte';
import {NavController, NavParams} from 'ionic-angular';
import {ParteListComponent} from './parte-list.component';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';

import {FORM_DIRECTIVES, 
        REACTIVE_FORM_DIRECTIVES,
        FormBuilder,  
        FormGroup,
        Validators, 
        AbstractControl} from '@angular/forms';

@Component({
    templateUrl:'build/pages/parte/parte-editar.component.html',
    directives:[FORM_DIRECTIVES,REACTIVE_FORM_DIRECTIVES],
    providers:[ParteService],
})

export class ParteEditarComponent{

    public myForm: FormGroup;

    constructor(private _nav: NavController, private _navParams: NavParams,
                private fb: FormBuilder, 
                private parteService: ParteService, 
                private  _varios: VariosService){
       let params = _navParams;
       let parte: Parte;
       parte = new Parte(null,null,null);

       let fechaActual=_varios.getNowDate();
       let horaActual=_varios.getNowTime();
       let clienteid:number;

       console.log(fechaActual);
       console.log(horaActual);

       if(!isNaN(Number(params.get('clienteid')))){ //para checkear que viene un valor numerico en el parametro
          //este caso siempre se debe dar cuando se trata de un nuevo parte.
           clienteid =params.get('clienteid');
           parte.clienteid=clienteid;
           parte.fecha=fechaActual;
           parte.horaini=horaActual;
           parte.horafin=horaActual;
       } else {
           //TODO: Si lo que recibo en los parametros es el parte,entonces lo igualo al objeto parte 
           //para editarlo en el form
       }

       

       this.myForm = this.fb.group({
           'id':[parte.id],
           'clienteid':[parte.clienteid],
           'fecha': [parte.fecha],
           'horaini': [parte.horaini],
           'horafin':[parte.horafin],
           'trabajorealizado':[parte.trabajorealizado],
           'personafirma':[parte.personafirma]
       });

    }
    cancelar(){
        this._nav.pop();
    }

    onSubmit(){
        let f = this.myForm.value;


        this.parteService.actualizaParte(f);

        this._nav.setRoot(ParteListComponent);
    }
} 