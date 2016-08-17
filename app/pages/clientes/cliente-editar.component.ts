import {Component} from '@angular/core';
import {Cliente} from '../../model/Cliente';
import {NavController, NavParams} from 'ionic-angular';
import {ClienteService} from '../../service/cliente.service';
import {ClienteListComponent} from './cliente-list.component';
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
    providers:[ClienteService],
})

export class ClienteEditarComponent{

    public myForm: FormGroup;

    constructor(private _nav: NavController, private _navParams: NavParams,
                private fb: FormBuilder, 
                private clienteService: ClienteService, 
                private  _varios: VariosService){
       let params = _navParams;
       let cliente: Cliente;
       cliente = new Cliente(null,'','');

       if(params.data.length>0){
           cliente = params.data[0];
       }
       console.log(_navParams);
       this.myForm = this.fb.group({
           'id':[cliente.id],
           'nombre': [cliente.nombre,Validators.required],
           'telefono': [cliente.telefono,Validators.pattern("[0-9]{9}")]
       });

    }
    cancelar(){
        this._nav.pop();
    }

    onSubmit(){
        let f = this.myForm.value;


        this.clienteService.actualizaCliente(f.id,f.nombre,f.telefono).then(
            (data)=>{
                    //TODO: Implementar aviso que ha guardar bien el cliente
                    console.log(data.res);
            },
            (error)=>{
                console.log('Error cliente-editar.component ' );
                console.log(error);
            }
        );

        this._nav.setRoot(ClienteListComponent);
    }
} 