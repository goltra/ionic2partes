import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ClienteListComponent } from '../clientes/cliente-list.component';
import { ParteListComponent } from '../parte/parte-list.component';
import { ClienteEditarComponent } from '../clientes/cliente-editar.component';
import { VariosService } from '../../service/varios.service';
export var HomePage = (function () {
    function HomePage(navCtrl, menu, v) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.menu.enable(true);
        this.dia = v.getNowDate();
    }
    HomePage.prototype.clientelist = function () {
        this.navCtrl.push(ClienteListComponent);
    };
    HomePage.prototype.partelist = function () {
        this.navCtrl.push(ParteListComponent);
    };
    HomePage.prototype.clienteedit = function () {
        this.navCtrl.push(ClienteEditarComponent);
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'home.html',
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: MenuController, },
        { type: VariosService, },
    ];
    return HomePage;
}());
