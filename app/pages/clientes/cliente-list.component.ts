import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import {ClienteEditarComponent} from './cliente-editar.component';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {VariosService} from '../../service/varios.service';

@Component({
    templateUrl: 'build/pages/clientes/cliente-list.html',
    providers:[ClienteService],
})
export class ClienteListComponent implements OnInit{
    public clientes: Cliente[];



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
        this._clienteService.listaClientes().then(
            (data)=>{
                    this.clientes=[];
                    if(data.res.rows.length>0){
                        for (let i = 0; i < data.res.rows.length; i++) {
                            let item = data.res.rows.item(i);
                            this.clientes.push(item);
                        }
                    }
                },
                (error)=>{

                }
        );
    }
    cargaCliente(cliente:Cliente){
        console.log('carga cliente');
        this.navCtrl.push(ClienteEditarComponent,[cliente]);
    }
    crearCliente(){
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
    
}