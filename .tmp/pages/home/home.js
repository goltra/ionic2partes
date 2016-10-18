import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { ClienteListComponent } from '../clientes/cliente-list.component';
import { ClienteEditarComponent } from '../clientes/cliente-editar.component';
export var HomePage = (function () {
    function HomePage(navCtrl, menu) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.menu.enable(true);
    }
    HomePage.prototype.clientelist = function () {
        this.navCtrl.push(ClienteListComponent);
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
    ];
    return HomePage;
}());
