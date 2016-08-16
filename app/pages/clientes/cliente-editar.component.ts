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
        let existeCliente:number;

        this.clienteService.existeCliente(f.id).then(
            (data)=>{
                if(data.res.rows.length>0){
                    console.log('data');
                    existeCliente = data.res.rows[0].numclientes;
                    this.clienteService.modificarCliente(new Cliente(f.id,f.nombre,f.telefono));
                }
            },
            (error)=>{
                alert('Error comprobando si existe el cliente');
            }
        )
        //comprobar si el cliente enviado existe. Si existe actualizo
        //si no creo.
        console.log(existeCliente);
        /** if(existeCliente>0){
            //console.log('llamo a modificar');
            this.clienteService.modificarCliente(new Cliente(f.id,f.nombre,f.telefono));
        } else {
            //console.log('llamo a crear');
            this.clienteService.creaCliente(f.nombre,f.telefono);
        } */
        this._nav.setRoot(ClienteListComponent);
    }
} 