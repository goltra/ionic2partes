import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { ParteEditarComponent } from './parte-editar.component';
import { Parte } from '../../model/parte';
export var ParteListComponent = (function () {
    function ParteListComponent(navCtrl, parteService, varios) {
        this.navCtrl = navCtrl;
        this.parteService = parteService;
        this.varios = varios;
        this.listadoPartes();
    }
    ParteListComponent.prototype.listadoPartes = function () {
        var _this = this;
        this.parteService.listaPartes().then(function (data) {
            console.log('cargando partes');
            _this.partes = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows.item(i);
                    _this.partes.push(Parte.inicializa(item));
                }
                return _this.partes;
            }
        }, function (error) {
            console.log("Error cargando los partes " + error.message);
        }).catch(function (error) {
            console.log("Error cargando en listadoPartes " + error.message);
        }).then(function (res) { console.log(res); });
    };
    ParteListComponent.prototype.cargaParte = function (parte) {
        this.navCtrl.push(ParteEditarComponent, [parte]);
    };
    ParteListComponent.prototype.crearParte = function (clienteid) {
        console.log('crearParte()');
        this.navCtrl.push(ParteEditarComponent);
    };
    ParteListComponent.prototype.eliminaParte = function (parteid) {
        var _this = this;
        this.parteService.elimina(parteid).then(function (data) {
            _this.varios.showToast("Parte Eliminado", "top");
            _this.listadoPartes();
        });
    };
    ParteListComponent.prototype.enviarEmail = function (parte) {
        console.log('envia email');
        this.parteService.enviaPorEmail(parte);
    };
    ParteListComponent.decorators = [
        { type: Component, args: [{
                    templateUrl: 'parte-list.component.html',
                },] },
    ];
    /** @nocollapse */
    ParteListComponent.ctorParameters = [
        { type: NavController, },
        { type: ParteService, },
        { type: VariosService, },
    ];
    return ParteListComponent;
}());
