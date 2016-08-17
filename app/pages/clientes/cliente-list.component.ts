import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ClienteEditarComponent} from './cliente-editar.component';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';

@Component({
    templateUrl: 'build/pages/clientes/cliente-list.html',
    providers:[ClienteService],
})
export class ClienteListComponent implements OnInit{
    public clientes: Cliente[];


    constructor(private navCtrl: NavController, 
                private navParams: NavParams,   
                private actionSheetController: ActionSheetController,
                private _clienteService: ClienteService){

            
    }

    ngOnInit(){
        this.listaClientes();
    }

    listaClientes(){
        let result: any;
        this._clienteService.listaClientes().then(
            (data)=>{
                    this.clientes=[];
                    if(data.res.rows.length>0){
                        for (let i = 0; i < data.res.rows.length; i++) {
                            let item = data.res.rows[i];
                            this.clientes.push(item);
                        }
                    }
                },
                (error)=>{
                    alert("Error al cargar la lista de clientes");
                }
        );
    }
    cargaCliente(cliente:Cliente){
        this.navCtrl.push(ClienteEditarComponent,[cliente]);
    }
  
    borrarCliente(){
        alert('Aún no se puede eliminar pero falta poco ');
    }
    
}