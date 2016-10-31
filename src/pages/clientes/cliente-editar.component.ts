import {Component} from '@angular/core';
import {Cliente} from '../../model/Cliente'; //si pongo "/cliente" da error , no se pq
import {NavController, NavParams} from 'ionic-angular';
import {ClienteService} from '../../service/cliente.service';
import {ClienteListComponent} from './cliente-list.component';
import {VariosService} from '../../service/varios.service';

import {FormsModule, 
        ReactiveFormsModule,
        FormBuilder,  
        FormGroup,
        Validators, 
        AbstractControl} from '@angular/forms';

@Component({
    templateUrl:'cliente-editar.html',
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
       cliente = new Cliente();

       if(params.data.length>0){
           cliente = Cliente.inicializa(params.data[0]);
       }
       console.log("editando cliente id " + cliente.id);
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
                    this._varios.showToast("Cliente guardado correctamente","top");
            },
            (error)=>{
                //console.log('Error cliente-editar.component ' );
                //console.log(error);
            }
        );

        this._nav.setRoot(ClienteListComponent);
    }
} 