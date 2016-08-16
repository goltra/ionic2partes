import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ClienteEditarComponent} from './cliente-editar.component';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';

@Component({
    templateUrl: 'build/pages/clientes/cliente-list.html',
    providers:[ClienteService],
})
export class ClienteListComponent{
    public clientes: Cliente[];


    constructor(private navCtrl: NavController, 
                private navParams: NavParams,   
                private actionSheetController: ActionSheetController,
                private _clienteService: ClienteService){
        console.log('clientes');
        this.listaClientes();
            
    }
    listaClientes(){
        let result: any;
        this.clientes = this._clienteService.listaClientes();
    }
    cargaCliente(cliente:Cliente){
        this.navCtrl.push(ClienteEditarComponent,[cliente]);
    }
  

    
}