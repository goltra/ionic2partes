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
        this.listaClientes();
            
    }
    listaClientes(){
        let result: any;
        this._clienteService.listaClientes().then(
            data => {
            this.clientes = [];
            if (data.res.rows.length > 0) {
            for (var i = 0; i < data.res.rows.length; i++) {
                let item = data.res.rows.item(i);
                this.clientes.push(new Cliente(item.nombre, item.telefono));
            }
            }
        });
    }
  

    
}