import { OnInit } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { Cliente } from '../../model/Cliente';
import { ClienteService } from '../../service/cliente.service';
import { VariosService } from '../../service/varios.service';
export declare class ClienteListComponent implements OnInit {
    private navCtrl;
    private navParams;
    private actionSheetController;
    private _clienteService;
    private variosService;
    clientes: Cliente[];
    private c;
    constructor(navCtrl: NavController, navParams: NavParams, actionSheetController: ActionSheetController, _clienteService: ClienteService, variosService: VariosService);
    ngOnInit(): void;
    listaClientes(): void;
    cargaCliente(cliente: Cliente): void;
    crearCliente(): void;
    borrarCliente(id: number): void;
    crearParte(clienteid: number): void;
}
