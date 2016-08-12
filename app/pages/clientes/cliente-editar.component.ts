import {Component} from '@angular/core';
import {Cliente} from '../../model/Cliente';
import {NavController, NavParams} from 'ionic-angular';
import {ClienteService} from '../../service/cliente.service';
import {ClienteListComponent} from './cliente-list.component';

import {FORM_DIRECTIVES, 
        REACTIVE_FORM_DIRECTIVES,
        FormBuilder,  
        FormGroup,
        Validators, 
        AbstractControl} from '@angular/forms';

@Component({
    templateUrl:'build/pages/clientes/cliente-editar.html',
    directives:[FORM_DIRECTIVES,REACTIVE_FORM_DIRECTIVES],
    providers:[ClienteService],
})

export class ClienteEditarComponent{

    public myForm: FormGroup;

    constructor(private _nav: NavController, private fb: FormBuilder, 
                private clienteService: ClienteService){
       
       this.myForm = this.fb.group({
           'nombre': ['nombre por defecto',Validators.required],
           'telefono': ['',Validators.pattern("[0-9]{9}")]
       });

    }
   

    onSubmit(){
        let f = this.myForm.value;
        this.clienteService.creaCliente(f.nombre,f.telefono);
        this._nav.push(ClienteListComponent);
    }
} 