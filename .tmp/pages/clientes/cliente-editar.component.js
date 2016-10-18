import { Component } from '@angular/core';
import { Cliente } from '../../model/Cliente';
import { NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../service/cliente.service';
import { ClienteListComponent } from './cliente-list.component';
import { VariosService } from '../../service/varios.service';
import { FormBuilder, Validators } from '@angular/forms';
export var ClienteEditarComponent = (function () {
    function ClienteEditarComponent(_nav, _navParams, fb, clienteService, _varios) {
        this._nav = _nav;
        this._navParams = _navParams;
        this.fb = fb;
        this.clienteService = clienteService;
        this._varios = _varios;
        var params = _navParams;
        var cliente;
        cliente = new Cliente();
        if (params.data.length > 0) {
            cliente = Cliente.inicializa(params.data[0]);
        }
        console.log("editando cliente id " + cliente.id);
        this.myForm = this.fb.group({
            'id': [cliente.id],
            'nombre': [cliente.nombre, Validators.required],
            'telefono': [cliente.telefono, Validators.pattern("[0-9]{9}")]
        });
    }
    ClienteEditarComponent.prototype.cancelar = function () {
        this._nav.pop();
    };
    ClienteEditarComponent.prototype.onSubmit = function () {
        var _this = this;
        var f = this.myForm.value;
        this.clienteService.actualizaCliente(f.id, f.nombre, f.telefono).then(function (data) {
            _this._varios.showToast("Cliente guardado correctamente", "top");
        }, function (error) {
            //console.log('Error cliente-editar.component ' );
            //console.log(error);
        });
        this._nav.setRoot(ClienteListComponent);
    };
    ClienteEditarComponent.decorators = [
        { type: Component, args: [{
                    templateUrl: 'cliente-editar.html',
                    providers: [ClienteService],
                },] },
    ];
    /** @nocollapse */
    ClienteEditarComponent.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: FormBuilder, },
        { type: ClienteService, },
        { type: VariosService, },
    ];
    return ClienteEditarComponent;
}());
