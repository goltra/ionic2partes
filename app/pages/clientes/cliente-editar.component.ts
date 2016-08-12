import {Component} from '@angular/core';
import {Cliente} from '../../model/Cliente';
import {NavController, NavParams} from 'ionic-angular';
import {ClienteService} from '../../service/cliente.service';
import {ClienteListComponent} from './cliente-list.component';

import {FORM_DIRECTIVES, 
        FormBuilder,  
        ControlGroup, 
        Validators, 
        AbstractControl} from '@angular/common';

@Component({
    templateUrl:'build/pages/clientes/cliente-editar.html',
    providers:[ClienteService],
})

export class ClienteEditarComponent{
    public clienteForm: ControlGroup;
    public nombre: AbstractControl;
    public telefono: AbstractControl;

    constructor(private _nav: NavController, private fb: FormBuilder, 
                private clienteService: ClienteService){
        this.clienteForm = this.fb.group({
            'nombre':['',Validators.compose([Validators.required,Validators.minLength(8)])],
            'telefono':['',Validators.compose([Validators.required,Validators.minLength(8)])],
        })

    }
    onSubmit(){
        let nombre: string;
        let telefono:string;
        let result: any;
        nombre =this.clienteForm.controls['nombre'].value
        telefono =this.clienteForm.controls['telefono'].value
        result = this.clienteService.creaCliente(nombre,telefono);
        this._nav.push(ClienteListComponent);
        

         
    }
} 