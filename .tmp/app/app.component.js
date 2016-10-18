import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ClienteListComponent } from '../pages/clientes/cliente-list.component';
import { ParteListComponent } from '../pages/parte/parte-list.component';
import { DatabaseProvider } from '../provider/database.provider';
export var MyApp = (function () {
    function MyApp(platform, menu, db) {
        var _this = this;
        this.menu = menu;
        this.db = db;
        this.rootPage = HomePage;
        this.pages = [
            {
                title: "Inicio",
                component: HomePage
            },
            {
                title: "Listado de clientes",
                component: ClienteListComponent
            },
            {
                title: "Listado de partes",
                component: ParteListComponent
            },
        ];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            //inicializa la bd creando el fichero de bd pero no la estructura.
            _this.db.dbname = "partes";
            _this.db.init();
        });
    }
    MyApp.prototype.openPage = function (p) {
        this.menu.close();
        console.log(p);
        this.nav.setRoot(p.component);
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html'
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: MenuController, },
        { type: DatabaseProvider, },
    ];
    MyApp.propDecorators = {
        'nav': [{ type: ViewChild, args: [Nav,] },],
    };
    return MyApp;
}());
