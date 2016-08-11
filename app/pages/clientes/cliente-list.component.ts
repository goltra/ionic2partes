import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';

@Component({
    selector: 'cliente-list',
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
        console.log(this._clienteService.listaClientes());
            
    }

    
}