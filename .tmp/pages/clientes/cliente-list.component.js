import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { ClienteEditarComponent } from './cliente-editar.component';
import { ParteEditarComponent } from '../parte/parte-editar.component';
import { Cliente } from '../../model/Cliente';
import { ClienteService } from '../../service/cliente.service';
import { VariosService } from '../../service/varios.service';
export var ClienteListComponent = (function () {
    function ClienteListComponent(navCtrl, navParams, actionSheetController, _clienteService, variosService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetController = actionSheetController;
        this._clienteService = _clienteService;
        this.variosService = variosService;
    }
    ClienteListComponent.prototype.ngOnInit = function () {
        this.listaClientes();
    };
    ClienteListComponent.prototype.listaClientes = function () {
        var _this = this;
        var result;
        console.log("Listado de clientes");
        //console.log(this._clienteService.listaClientes());
        this._clienteService.listaClientes().then(function (data) {
            _this.clientes = [];
            console.log(data.rows);
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows.item(i);
                    _this.clientes.push(Cliente.inicializa(item));
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    ClienteListComponent.prototype.cargaCliente = function (cliente) {
        console.log('carga cliente');
        this.navCtrl.push(ClienteEditarComponent, [cliente]);
    };
    ClienteListComponent.prototype.crearCliente = function () {
        this.navCtrl.push(ClienteEditarComponent);
    };
    ClienteListComponent.prototype.borrarCliente = function (id) {
        var _this = this;
        this._clienteService.borrarCliente(id).then(function (data) {
            console.log(data.res);
            _this.variosService.showToast("Cliente eliminado", "top");
            _this.listaClientes();
        }, function (error) {
            console.log(error);
        });
    };
    ClienteListComponent.prototype.crearParte = function (clienteid) {
        this.navCtrl.push(ParteEditarComponent, { clienteid: clienteid });
    };
    ClienteListComponent.decorators = [
        { type: Component, args: [{
                    templateUrl: 'cliente-list.html',
                    providers: [ClienteService],
                },] },
    ];
    /** @nocollapse */
    ClienteListComponent.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: ActionSheetController, },
        { type: ClienteService, },
        { type: VariosService, },
    ];
    return ClienteListComponent;
}());
