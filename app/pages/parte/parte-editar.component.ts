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
    templateUrl:'build/pages/clientes/cliente-editar.html',
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
      // let parte: Parte;
       let parte1 = new Parte(null,null,null);

       /*if(params.data.length>0){
           parte = params.data[0];
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
*/
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