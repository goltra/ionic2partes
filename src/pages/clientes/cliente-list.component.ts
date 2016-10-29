import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ClienteEditarComponent} from './cliente-editar.component';
import {ParteEditarComponent} from '../parte/parte-editar.component';
import {Cliente} from '../../model/Cliente';
import {ClienteService} from '../../service/cliente.service';
import {VariosService} from '../../service/varios.service';

@Component({
    templateUrl: 'cliente-list.html',
    providers:[ClienteService],
})
export class ClienteListComponent implements OnInit{
    public clientes: Cliente[];

    private c: Cliente;

    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private actionSheetController: ActionSheetController,
                private _clienteService: ClienteService,
                private variosService: VariosService){


    }

    ngOnInit(){
        this.listaClientes();

    }

    listaClientes(){
        let result: any;
        console.log("Listado de clientes");
        //console.log(this._clienteService.listaClientes());
         this._clienteService.listaClientes().then(
            (data)=>{
                    this.clientes=[];
                    console.log(data.rows);
                    if(data.rows.length>0){
                        for (let i = 0; i < data.rows.length; i++) {
                            let item = data.rows.item(i);
                            this.clientes.push(Cliente.inicializa(item));
                        }
                    }
                },
                (error)=>{
                    console.log(error);
                }
        );
    }
    cargaCliente(cliente:Cliente){
        console.log('carga cliente');
        this.navCtrl.push(ClienteEditarComponent,[cliente]);
    }
    crearCliente(){
        console.log('crea cliente');
        this.navCtrl.push(ClienteEditarComponent);
    }
    borrarCliente(id: number){
        this._clienteService.borrarCliente(id).then(
            (data)=>{
                console.log(data.res);
                this.variosService.showToast("Cliente eliminado","top");
                this.listaClientes();
            },
            (error)=>{
                console.log(error);
            }
            );

    }
    crearParte(clienteid:number){
        this.navCtrl.push(ParteEditarComponent,{clienteid: clienteid})
    }

}
