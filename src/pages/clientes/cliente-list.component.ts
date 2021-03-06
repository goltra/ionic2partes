import {Component, OnInit} from '@angular/core';
import {NavController, NavParams,AlertController} from 'ionic-angular';
import {ClienteEditarComponent} from './cliente-editar.component';
import {ParteEditarComponent} from '../parte/parte-editar.component';
import {Cliente} from '../../model/cliente';
import {ClienteService} from '../../service/cliente.service';
import {VariosService} from '../../service/varios.service';
declare var window;
declare var cordova;

@Component({
    templateUrl: 'cliente-list.html',
    providers:[ClienteService],
})
export class ClienteListComponent implements OnInit{
    public clientes: Cliente[];



    constructor(private navCtrl: NavController,
                private navParams: NavParams,
                private _clienteService: ClienteService,
                private alertCtrl: AlertController,
                private variosService: VariosService){


    }

    ngOnInit(){
        this.listaClientes();

    }

    listaClientes(){
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
        let confirm = this.alertCtrl.create({
      title: 'Borrar Cliente',
      message: 'Va a borrar un cliente. Esta acción no puede deshacerse. ¿Deesea continuar?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('borrar NO');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('borrar SI');
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
      ]
    });
    confirm.present();
        

    }
    crearParte(clienteid:number,nombre:string){
        this.navCtrl.push(ParteEditarComponent,{clienteid: clienteid,nombre: nombre })
    }
    llamar(telefono: string){
        cordova.InAppBrowser.open("tel:" + telefono, "_system", "location=true");
    }

}
