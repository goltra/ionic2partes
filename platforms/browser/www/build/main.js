webpackJsonp([0],{

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Settings; });
var Settings = (function () {
    function Settings() {
    }
    Settings.prototype.contructor = function () {
        this.imagen = "";
        this.imagenBase64 = "";
    };
    /** Devuelve el objeto del tipo Settings recibiendo un objeto generico */
    Settings.inicializa = function (values) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            var setting = new Settings();
            // console.log("parte inicializado a null")
            for (var p in values) {
                if (Object.getOwnPropertyDescriptor(values, p) != undefined) {
                    setting[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return setting;
        }
        catch (error) {
            alert("Settings.inicializa " + error);
            return null;
        }
    };
    Object.defineProperty(Settings.prototype, "nombreCompleto", {
        get: function () {
            return this.empresa + ' - ' + this.cif;
        },
        enumerable: true,
        configurable: true
    });
    return Settings;
}());

//# sourceMappingURL=settings.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_estadisticas_service__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_estadisticas_provider__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_locale_es__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment_locale_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(363);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { Chart } from 'chart.js';






/*
  Generated class for the Estadisticas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var EstadisticasPage = (function () {
    function EstadisticasPage(navCtrl, _estadistica, screenOrientation, navParams, estadisticasServ) {
        var _this = this;
        this.navCtrl = navCtrl;
        this._estadistica = _estadistica;
        this.screenOrientation = screenOrientation;
        this.navParams = navParams;
        this.estadisticasServ = estadisticasServ;
        this.datospromesa = [this.etiquetas, this.datos, this.colorfondo, this.colorborde];
        this.etiquetas = [];
        this.datos = [];
        this.colorfondo = [];
        this.colorborde = [];
        this.dias = 5; // Días a mostar en las estadisticas
        this.estadistica = _estadistica;
        this.estadistica.numeropartes().then(function (data) {
            _this.numpartes = data;
        });
        /*this.estadistica.numeropartesdias(1).then(data => {
                this.numpartesdias = data;
                });*/
        this.estadistica.numeropartesdeldia(__WEBPACK_IMPORTED_MODULE_4_moment__()).then(function (data) {
            _this.numparteshoy = data;
        });
        this.estadistica.numeropartesdelasemana(__WEBPACK_IMPORTED_MODULE_4_moment__()).then(function (data) {
            _this.numpartesdelasemana = data;
        });
        this.estadistica.numeropartesdelmes(__WEBPACK_IMPORTED_MODULE_4_moment__()).then(function (data) {
            _this.numpartesmes = data;
        });
        this.estadistica.numeropartesdelanio(__WEBPACK_IMPORTED_MODULE_4_moment__()).then(function (data) {
            _this.numpartesanio = data;
        });
    }
    EstadisticasPage.prototype.ionViewDidLoad = function () {
        this.estadisticasdia(this.dias);
        // detect orientation changes
        this.screenOrientation.onChange().subscribe(function () {
            console.log("Orientation Changed");
        });
    };
    EstadisticasPage.prototype.estadisticasdia = function (dias) {
        var _this = this;
        return new Promise(function (resolve) {
            // this.datospromesa = [this.etiquetas,this.datos,this.colorfondo,this.colorborde];
            var colorresto = 'rgba(102,178,255,0.5)';
            var colorhoy = 'rgba(200,50,78,0.5)';
            var colorborderesto = 'rgba(0,128,255,1)';
            var colorbordehoy = 'rgba(150,13,78,1)';
            dias--;
            console.log("DIA - " + dias);
            if (dias >= 0) {
                var fechadia_1 = __WEBPACK_IMPORTED_MODULE_4_moment__().subtract(dias, 'days');
                _this._estadistica.numeropartesdeldia(fechadia_1).then(function (data) {
                    console.log("ESPERANDO RECIBIR DATO");
                    _this.datos.push(data);
                    // console.log("Datos["+dias+"] -> "+this.datos[dias]);
                    var diasemana = fechadia_1.format("ddd, D, MMM");
                    _this.etiquetas.push(diasemana);
                    if (fechadia_1.isSame(__WEBPACK_IMPORTED_MODULE_4_moment__(), 'day')) {
                        console.log("La fecha es hoy");
                        _this.colorfondo.push(colorhoy);
                        _this.colorborde.push(colorbordehoy);
                    }
                    else {
                        //console.log("Las fechas no coinciden");
                        _this.colorfondo.push(colorresto);
                        _this.colorborde.push(colorborderesto);
                    }
                    _this.estadisticasdia((dias));
                });
            }
            else {
                _this.pintagrafica();
            }
            resolve(_this.datospromesa);
        });
    };
    //   estadisticasdia(dias): Promise<any> {
    // 		return new Promise((resolve) => { 
    //             let datospromesa: Array<Array<any>>;
    //             let termina;        
    //             let etiquetas: Array<string>;
    //             let datos: Array<string>;
    //             let colorfondo: Array<string>;
    //             let colorborde: Array<string>;
    //             etiquetas = [];
    //             datos = [];
    //             colorfondo = [];
    //             colorborde = [];
    //             datospromesa = [etiquetas,datos,colorfondo,colorborde];
    //             let colorresto = 'rgba(102,178,255,0.5)';
    //             let colorhoy = 'rgba(200,50,78,0.5)';
    //             let colorborderesto = 'rgba(0,128,255,1)';
    //             let colorbordehoy = 'rgba(150,13,78,1)';
    //             for (let i = 0; i < dias; i++) {
    //                         //console.log("Resto "+i+ "dias");
    //                         let fechadia = moment().subtract(i, 'days');
    //                         let diasemana = fechadia.format("ddd, D, MMM");
    //                         etiquetas.push(diasemana);
    //                         this._estadistica.numeropartesdeldia(fechadia).then(data => {
    //                             console.log("ESPERANDO RECIBIR DATO");
    //                             //console.log("Data -> "+data);
    //                             datos.push(data);
    //                             console.log("Datos["+i+"] -> "+datos[i]);
    //                         });
    //                         if(i==0){
    //                             //console.log("La fecha es hoy");
    //                             colorfondo.push(colorhoy);
    //                             colorborde.push(colorbordehoy);
    //                         } else {
    //                                 //console.log("Las fechas no coinciden");
    //                                 colorfondo.push(colorresto);
    //                                 colorborde.push(colorborderesto);
    //                         }
    //                         }
    //                 resolve(datospromesa);
    //              });
    //   }
    EstadisticasPage.prototype.pintagrafica = function () {
        // this.estadisticasdia(num).then(data => {
        console.log("ENTRO A PINTAR LA GRAFICA");
        this.barChart = new Chart(this.barCanvas.nativeElement, {
            type: 'bar',
            responsive: true,
            data: {
                labels: this.etiquetas,
                datasets: [{
                        label: 'Número de partes',
                        data: this.datos,
                        backgroundColor: this.colorfondo,
                        borderColor: this.colorborde,
                        borderWidth: 1
                    }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                            ticks: {
                                fontSize: 10,
                                beginAtZero: true,
                                fixedStepSize: 1
                            },
                        }],
                    xAxes: [{
                            ticks: {
                                fontSize: 10,
                                beginAtZero: true,
                                fixedStepSize: 1
                            },
                        }]
                },
                legend: {
                    fontSize: 10
                },
                animation: {
                    onComplete: function () {
                        console.log("TERMINO LA ANIMCAION DE LA GRAFICA");
                        //this.sacoImagenGrafica();
                    }
                }
            }
        });
        // console.log("CONVIERTO GRAFICA A IMG 64");
        // this.imgChartBase64 = this.barChart.toBase64Image();
        // console.log(this.imgChartBase64);
        // this.barChart.onAnimationComplete(this.imgChartBase64 = this.barChart.toBase64Image());
        // });
    };
    EstadisticasPage.prototype.enviarEmail = function () {
        var _this = this;
        console.log('envia email');
        console.log("CONVIERTO GRAFICA A IMG 64");
        this.imgChartBase64 = this.barChart.toBase64Image();
        console.log(this.imgChartBase64);
        this.estadisticasServ.cargoSettings().then(function (data) {
            _this.settings = data;
            //console.log(data);
            console.log("Tecnico -> " + _this.settings.tecnico);
            console.log("IMG BASE 64 GRAFICA -> " + _this.imgChartBase64);
            _this.estadisticasServ.enviaPorEmail(_this.settings, _this.imgChartBase64, _this.numpartesanio, _this.numparteshoy, _this.numpartesdelasemana, _this.numpartesmes);
        });
    };
    return EstadisticasPage;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["ViewChild"])('barCanvas'),
    __metadata("design:type", Object)
], EstadisticasPage.prototype, "barCanvas", void 0);
EstadisticasPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
        selector: 'page-estadisticas',template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/estadisticas/estadisticas.html"*/'<!--\n  Generated template for the Estadisticas page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n     <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Estadísticas</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h2 style="text-align:center">Total de partes hoy: {{numparteshoy}}</h2>\n  <h3 style="text-align:center">Esta semana: {{numpartesdelasemana}} | Este mes {{numpartesmes}} | Este año: {{numpartesanio}}</h3>   \n\n<ion-card>\n      <ion-card-header>\n       <h3> Número de partes de los últimos {{dias}} días</h3> \n      </ion-card-header>\n      <ion-card-content>\n        <canvas #barCanvas></canvas>\n      \n      <button full ion-button (click)="enviarEmail()">\n            <ion-icon name="mail"></ion-icon>\n              Enviar\n          </button>\n            </ion-card-content>\n    </ion-card>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/estadisticas/estadisticas.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__provider_estadisticas_provider__["a" /* EstadisticasProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__service_estadisticas_service__["a" /* EstadisticasService */]])
], EstadisticasPage);

// this.barChart = new Chart(this.barCanvas.nativeElement, {
//        type: 'bar',
// data: {
//     labels: etiquetas,
//     datasets: [{
//         label: 'Número de partes',
//         data: datos,
//         backgroundColor: 
//             colorfondo,
//         borderColor: colorborde,
//         borderWidth: 1
//     }]
// },
// options: {
//     scales: {
//         yAxes: [{
//             ticks: {
//                 beginAtZero:true,
//                 fixedStepSize: 1
//             }
//         }]
//     }
// }
//     });
//# sourceMappingURL=estadisticas.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteEditarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_cliente__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_cliente_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cliente_list_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__(24);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

 //si pongo "/cliente" da error , no se pq





var ClienteEditarComponent = (function () {
    function ClienteEditarComponent(_nav, _navParams, fb, clienteService, _varios) {
        this._nav = _nav;
        this._navParams = _navParams;
        this.fb = fb;
        this.clienteService = clienteService;
        this._varios = _varios;
        var params = _navParams;
        this.cliente = new __WEBPACK_IMPORTED_MODULE_1__model_cliente__["a" /* Cliente */]();
        if (params.data.length > 0) {
            this.cliente = __WEBPACK_IMPORTED_MODULE_1__model_cliente__["a" /* Cliente */].inicializa(params.data[0]);
        }
        console.log("editando cliente id " + this.cliente.id);
        this.myForm = this.fb.group({
            'id': [this.cliente.id],
            'nombre': [this.cliente.nombre, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].required],
            'personaContacto': [this.cliente.personaContacto],
            'telefono': [this.cliente.telefono, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].pattern("[0-9]{9}")],
            'telefono2': [this.cliente.telefono2, __WEBPACK_IMPORTED_MODULE_6__angular_forms__["f" /* Validators */].pattern("[0-9]{9}")],
            'email': [this.cliente.email],
            'direccion': [this.cliente.direccion],
            'poblacion': [this.cliente.poblacion],
            'cp': [this.cliente.cp],
            'provincia': [this.cliente.provincia],
            'cif': [this.cliente.cif],
            'observaciones': [this.cliente.observaciones]
        });
    }
    ClienteEditarComponent.prototype.llama = function () {
        if (this.cliente.telefono !== null && this.cliente.telefono.length > 0) {
            console.log("Llamando al " + this.cliente.telefono);
            // window.open( "tel:" + this.cliente.telefono);
            cordova.InAppBrowser.open("tel:" + this.cliente.telefono, "_system", "location=true");
        }
        else {
            console.log("No es un teléfono válido para llamar");
        }
    };
    ClienteEditarComponent.prototype.cancelar = function () {
        this._nav.pop();
    };
    ClienteEditarComponent.prototype.onSubmit = function () {
        var _this = this;
        var f = this.myForm.value;
        this.clienteService.actualizaCliente(f.id, f.nombre, f.personaContacto, f.telefono, f.telefono2, f.email, f.direccion, f.poblacion, f.cp, f.provincia, f.cif, f.observaciones).then(function (data) {
            _this._varios.showToast("Cliente guardado correctamente", "top");
        }, function (error) {
            //console.log('Error cliente-editar.component ' );
            //console.log(error);
        });
        this._nav.setRoot(__WEBPACK_IMPORTED_MODULE_4__cliente_list_component__["a" /* ClienteListComponent */]);
    };
    return ClienteEditarComponent;
}());
ClienteEditarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/clientes/cliente-editar.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Crear cliente</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n\n    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n        <ion-input hidden formControlName="id"></ion-input>\n        <ion-item>\n            \n                <ion-label floating>Nombre</ion-label>\n                <ion-input formControlName="nombre"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Persona de contacto</ion-label>\n                <ion-input formControlName="personaContacto"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n\n                <ion-label floating>Telefono</ion-label>\n                <ion-input formControlName="telefono" (click)="llama()"></ion-input>\n\n        </ion-item>\n         <ion-item>\n\n                <ion-label floating>Telefono 2</ion-label>\n                <ion-input formControlName="telefono2" (click)="llama()"></ion-input>\n\n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Email</ion-label>\n                <ion-input formControlName="email"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Dirección</ion-label>\n                <ion-input formControlName="direccion"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Población</ion-label>\n                <ion-input formControlName="poblacion"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n                \n                    <ion-label floating>CP</ion-label>\n                    <ion-input formControlName="cp"></ion-input>\n                \n            </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Provincia</ion-label>\n                <ion-input formControlName="provincia"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>CIF/NIE</ion-label>\n                <ion-input formControlName="cif"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Observaciones</ion-label>\n                <ion-input formControlName="observaciones"></ion-input>\n            \n        </ion-item>\n        \n        <ion-row>\n            <ion-col>\n                <button ion-button full type="submit">Guardar</button>\n            </ion-col>\n            <ion-col>\n                <input type="button" ion-button full color="danger" (click)="cancelar()" value="Cancelar">\n            </ion-col>\n            <ion-col>\n                <span ion-button full icon-only (click)="llama()">\n                <ion-icon color="secondary" name="call" ></ion-icon>\n            </span>\n            </ion-col>\n        </ion-row>\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/clientes/cliente-editar.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_cliente_service__["a" /* ClienteService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_3__service_cliente_service__["a" /* ClienteService */],
        __WEBPACK_IMPORTED_MODULE_5__service_varios_service__["a" /* VariosService */]])
], ClienteEditarComponent);

//# sourceMappingURL=cliente-editar.component.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__provider_database_provider__ = __webpack_require__(47);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClienteService = (function () {
    function ClienteService(platform, _db) {
        this.platform = platform;
        this.db = _db;
        console.log(this.db);
        // this.db.openDatabase({
        // name: 'data.db',
        // location: 'default' // the location field is required
        // }).then(() => {
        // this.db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {
        // }, (err) => {
        // console.error('Unable to execute sql: ', err);
        // });
        // }, (err) => {
        // console.error('Unable to open database: ', err);
        // });
        /*this.db.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT);').then(
                    (data)=>{
                        console.log("Crear tabla cliente")
                    },
                    (error)=>{
                        console.log("Error al crear la tabla cliente: ");
                        console.log(error);
                    }

        );*/
    }
    ClienteService.prototype.listaClientes = function () {
        var sql = 'Select * from cliente';
        console.log(this.db);
        return this.db.query(sql);
        //return this.db.executeSql(sql,[]);
        // return this.storage.query(sql);
    };
    ClienteService.prototype.borrarCliente = function (id) {
        var sql;
        sql = 'delete from cliente where id=?';
        return this.db.query(sql, [id]);
        // return this.storage.query(sql,[id]);
    };
    ClienteService.prototype.actualizaCliente = function (id, nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones) {
        if (id === void 0) { id = null; }
        var sql;
        if (id == null) {
            sql = 'INSERT INTO cliente (nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?)';
            return this.db.query(sql, [nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones]);
            //return this.storage.query(sql,[nombre,telefono]);
        }
        else {
            sql = "Update cliente set nombre=?,personaContacto=?, telefono=?, telefono2=?, email=?, direccion=?, poblacion=?, cp=?, provincia=?, cif=?, observaciones=? where id=?";
            return this.db.query(sql, [nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones, id]);
        }
    };
    return ClienteService;
}());
ClienteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__provider_database_provider__["a" /* DatabaseProvider */]])
], ClienteService);

//# sourceMappingURL=cliente.service.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteEditarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_parte__ = __webpack_require__(366);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_parte_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parte_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parte_fotos__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(134);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ParteEditarComponent = (function () {
    function ParteEditarComponent(_nav, _navParams, fb, camera, Keyboard, parteService, _varios, alertCtrl) {
        this._nav = _nav;
        this._navParams = _navParams;
        this.fb = fb;
        this.camera = camera;
        this.Keyboard = Keyboard;
        this.parteService = parteService;
        this._varios = _varios;
        this.alertCtrl = alertCtrl;
        this.fotos = [];
        this.signaturePadOptions = {
            'minWidth': 0.5,
            'maxWidth': 2,
            'canvasWidth': 380,
            'canvasHeight': 300,
        };
        var params = _navParams;
        this.parte = new __WEBPACK_IMPORTED_MODULE_1__model_parte__["a" /* Parte */]();
        var clienteid;
        if (!isNaN(Number(params.get('clienteid'))) && params.get('nombre')) {
            //este caso siempre se debe dar cuando se trata de un nuevo parte.
            console.log('Nuevo parte');
            this.nuevo = true;
            clienteid = params.get('clienteid');
            this.parte.nombre = params.get('nombre');
            this.parte.clienteid = clienteid;
            this.parte.fecha = _varios.getNowDateIso();
            this.parte.horaini = this.parte.fecha;
            this.parte.horafin = this.parte.fecha;
        }
        else {
            console.log('Parte existente');
            this.nuevo = false;
            this.parte = __WEBPACK_IMPORTED_MODULE_1__model_parte__["a" /* Parte */].inicializa(params.data[0]);
        }
        this.myForm = this.fb.group({
            'id': [this.parte.id],
            'clienteid': [this.parte.clienteid],
            'fecha': [this.parte.fecha],
            'horaini': [this.parte.horaini],
            'horafin': [this.parte.horafin],
            'trabajorealizado': [this.parte.trabajorealizado],
            'personafirma': [this.parte.personafirma],
            'firma': [this.parte.firma],
        });
    }
    ParteEditarComponent.prototype.cancelar = function () {
        this._nav.pop();
    };
    ParteEditarComponent.prototype.verFotos = function () {
        this._nav.push(__WEBPACK_IMPORTED_MODULE_7__parte_fotos__["a" /* ParteFotosPage */], { parteid: this.parte.id });
    };
    ParteEditarComponent.prototype.onSubmit = function (goList) {
        var _this = this;
        if (goList === void 0) { goList = true; }
        console.log('submit');
        var f = this.myForm.value;
        this.parteService.actualizaParte(f, this.fotos).then(function (parteid) {
            console.log('Guardado, el parte id es ');
            console.log(parteid);
            _this.parte.id = parteid;
        });
        this.fotos = [];
        if (goList)
            this._nav.setRoot(__WEBPACK_IMPORTED_MODULE_6__parte_list_component__["a" /* ParteListComponent */]);
    };
    ParteEditarComponent.prototype.drawStart = function () {
        console.log("comieza a firmar y oculto teclado");
        this.Keyboard.close();
    };
    ParteEditarComponent.prototype.ngAfterViewInit = function () {
        // this.signaturePad is now available
        this.signaturePad.options = this.signaturePadOptions; // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        if (this.parte.firma !== null) {
            this.signaturePad.fromDataURL(this.parte.firma);
            this.firmaImg = this.parte.firma;
        }
    };
    ParteEditarComponent.prototype.doOnEnd = function () {
        // will be notified of szimek/signature_pad's onEnd event
        this.firmaImg = this.signaturePad.toDataURL();
        this.myForm.value.firma = this.firmaImg;
        this.onSubmit();
    };
    ParteEditarComponent.prototype.limpiarFirma = function () {
        this.signaturePad.clear();
    };
    ParteEditarComponent.prototype.borrarFirma = function () {
        this.myForm.value.firma = null;
        this.firmaImg = null;
        //inicializo de nuevo el signaturPad, no se porqu tras estar oculto
        //y ponerlo visible el canvas pierde el height y el width
        this.signaturePad.options = this.signaturePadOptions;
        this.signaturePad.clear();
    };
    ParteEditarComponent.prototype.hacerFoto = function () {
        var _this = this;
        var options = {
            quality: 70,
            targetWidth: 1024,
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            correctOrientation: true
        };
        console.log('hacerFoto()');
        this.camera.getPicture(options).then(function (imgB64) {
            console.log('foto');
            var nomFichero = '';
            var alert = _this.alertCtrl.create({
                title: 'Indique un nombre para el fichero',
                inputs: [{
                        name: 'nombre',
                        placeholder: 'foto'
                    }],
                buttons: [{
                        text: 'Aceptar',
                        handler: function (data) {
                            nomFichero = (data.nombre.length > 0) ? data.nombre : 'Foto';
                            console.log('aceptado');
                            if (nomFichero.length > 0) {
                                //el id 0 indica que es una foto nueva
                                imgB64 = "data:image/jpeg;base64," + imgB64;
                                _this.fotos.push({ id: 0, base64: imgB64, nombre: nomFichero });
                                _this.onSubmit(false);
                            }
                        }
                    },
                    {
                        text: 'Cancelar'
                    }]
            });
            alert.present();
        }, function (error) {
            console.log('error obteniendo foto');
            console.log(error);
        });
    };
    return ParteEditarComponent;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__["SignaturePad"]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__["SignaturePad"])
], ParteEditarComponent.prototype, "signaturePad", void 0);
ParteEditarComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-editar.component.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Editar Parte de trabajo</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <h3 class="text-center">Parte de Trabajo para {{parte.nombre}} </h3>\n    <form class="margin-inferior" [formGroup]="myForm" (ngSubmit)="onSubmit()">\n        <ion-input hidden formControlName="id"></ion-input>\n        <ion-input hidden formControlName="clienteid"></ion-input>\n        <ion-item>\n            <ion-label floating>Fecha</ion-label>\n            <ion-datetime formControlName="fecha" displayFormat="DD/MM/YYYY"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Hora de inicio</ion-label>\n            <ion-datetime formControlName="horaini" displayFormat="HH:mm" minuteValues="00,15,30,45"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Hora de fin</ion-label>\n            <ion-datetime formControlName="horafin" displayFormat="HH:mm" minuteValues="00,15,30,45"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Trabajo realizado</ion-label>\n            <ion-textarea fz-elastic formControlName="trabajorealizado"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Autorizado por:</ion-label>\n            <ion-textarea formControlName="personafirma"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button full type="button" icon-left block (click)="hacerFoto()"><ion-icon name="ios-camera"></ion-icon>FOTO</button>\n                </ion-col>\n                <ion-col>\n                    <button ion-button full type="button" icon-left block  (click)="verFotos()"><ion-icon name="ios-image"></ion-icon> VER FOTOS</button>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button full type="submit">Guardar</button>\n                </ion-col>\n                <ion-col>\n                    <button ion-button full type="button" color="danger" (click)="cancelar()">Cancelar</button>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n        \n        <ion-row [hidden]="firmaImg!=null && firmaImg!=\'\'">\n            <ion-col>\n                <button ion-button full type="button" (click)="doOnEnd()">Aceptar firma</button>\n            </ion-col>\n            <ion-col>\n                <button ion-button full type="button" color="danger" (click)="limpiarFirma()">Borrar firma</button>\n            </ion-col>\n        </ion-row>\n        <ion-row [hidden]="(firmaImg==null || firmaImg==\'\') ">\n            <ion-col>\n                <button ion-button full type="button" color="danger" (click)="borrarFirma()">Borrar firma</button>\n            </ion-col>\n        </ion-row>\n        <ion-row [hidden]="(firmaImg==null || firmaImg==\'\') ">\n            <ion-col>\n                <img src="{{firmaImg}}" alt="firma">\n            </ion-col>\n        </ion-row>\n        <ion-item *ngIf="firmaImg==null || firmaImg==\'\'" text-wrap>Firma en el recuadro inferior y pulsa el botón "Aceptar firma".</ion-item>\n        <ion-row [hidden]="firmaImg!=null && firmaImg!=\'\'">\n            <ion-col>\n                <signature-pad (onBeginEvent)="drawStart()" [options]="signaturePadOptions"></signature-pad>\n                <!-- <canvas id="signature-pad"></canvas>        -->\n            </ion-col>\n        </ion-row>\n    </form>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-editar.component.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_4__service_parte_service__["a" /* ParteService */],
        __WEBPACK_IMPORTED_MODULE_5__service_varios_service__["a" /* VariosService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], ParteEditarComponent);

//# sourceMappingURL=parte-editar.component.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 156:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VersionProPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ID_COMPRA_PRO = 'com.goltratec.partestrabajo.versionpro';
/**
 * Generated class for the VersionProPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var VersionProPage = (function () {
    function VersionProPage(navCtrl, navParams, iap, plt) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iap = iap;
        this.plt = plt;
        this.versionPro = false;
        this.productos = [];
        this.comprasAnteriores = [];
        this.plt.ready().then(function () {
            console.log("PLATAFORMA LISTA");
            _this.iap.getProducts([ID_COMPRA_PRO])
                .then(function (productos) {
                _this.productos = productos;
            })
                .catch(function (err) {
                console.log(err);
            });
        });
    }
    VersionProPage.prototype.comprar = function (producto) {
        var _this = this;
        this.iap.buy(producto).then(function (data) {
            _this.activaProducto(producto);
        });
    };
    VersionProPage.prototype.restaurar = function () {
        var _this = this;
        this.iap.restorePurchases().then(function (compras) {
            _this.comprasAnteriores = compras;
            // Unlock the features of the purchases!
            for (var _i = 0, _a = _this.comprasAnteriores; _i < _a.length; _i++) {
                var anteriores = _a[_i];
                _this.activaProducto(anteriores.productId);
            }
        });
    };
    VersionProPage.prototype.activaProducto = function (id) {
        // Normally store these settings/purchases inside your app or server!
        if (id === ID_COMPRA_PRO) {
            this.versionPro = true;
        }
    };
    VersionProPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VersionProPage');
    };
    return VersionProPage;
}());
VersionProPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-version-pro',template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/version-pro/version-pro.html"*/'<!--\n  Generated template for the VersionProPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar>\n       <button ion-button menuToggle>\n        <ion-icon name=\'menu\'></ion-icon>\n      </button>\n      <ion-title>Version pro</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n\n<ion-content padding>\n  <ion-row text-center>\n    <ion-col>Versio Pro: <b>{{ versionpro }}</b></ion-col>\n  </ion-row>\n \n  <ion-card *ngFor="let producto of productos">\n    <ion-card-header>{{ producto.title }}</ion-card-header>\n    <ion-card-content>\n      {{ producto.description }}\n    </ion-card-content>\n    <ion-row>\n      <ion-col>\n        <button ion-button block (click)="comprar(producto.productId)">\n          Comprar ahora - {{ producto.price }}\n        </button>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n \n  <button ion-button full icon-left color="secondary" (click)="restaurar()">\n  <ion-icon name="refresh"></ion-icon>Restaurar\n</button>\n \n  <ion-card *ngFor="let anterior of comprasAnteriores">\n    <ion-card-header>Comprado {{ anterior.date | date:\'short\' }}</ion-card-header>\n    <ion-card-content>\n      {{ anterior.productId }}\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/version-pro/version-pro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */]])
], VersionProPage);

//# sourceMappingURL=version-pro.js.map

/***/ }),

/***/ 199:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 199;

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_settings__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment_locale_es__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_moment_locale_es__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var EstadisticasService = (function () {
    function EstadisticasService(_varios, _db, platform, s, emailComposer, socialSharing, file) {
        this._varios = _varios;
        this.platform = platform;
        this.s = s;
        this.emailComposer = emailComposer;
        this.socialSharing = socialSharing;
        this.file = file;
        this.db = _db;
        this.dirFiles = "";
        //seteo directorio para guardar ficheros.
        if (this.platform.is("ios")) {
            console.log('Directorio para ios');
            this.dirFiles = cordova.file.tempDirectory;
        }
        if (this.platform.is("android")) {
            console.log("Directorio para android");
            this.dirFiles = cordova.file.externalDataDirectory;
        }
        console.log(this.dirFiles);
    }
    EstadisticasService.prototype.cargoSettings = function () {
        var _this = this;
        console.log("Cargo los settings");
        return new Promise(function (resolve) {
            _this.s.getData().then(function (data) {
                var tmp = JSON.parse(data);
                console.log("cargo valores settings");
                resolve(__WEBPACK_IMPORTED_MODULE_2__model_settings__["a" /* Settings */].inicializa(tmp));
            }).catch(function (error) {
                console.log("ERROR Cargando los settings!!");
                resolve(null);
            });
        });
    };
    EstadisticasService.prototype.enviaPorEmail = function (settings, barChart, partesAnio, partesHoy, partesSemana, partesMes) {
        var _this = this;
        //let msg:String; 
        var email;
        var doc = new jsPDF('landscape');
        var asuntoEmail = "";
        this.settings = settings;
        console.log("Compruebo si el componente EmailComposer está disponible.");
        console.log("Tec -> " + this.settings.tecnico);
        this.emailComposer.isAvailable().then(function (available) {
            console.log("Email composer disponible");
            console.log("Texto que voy a incluir en pdf");
            console.log(_this.settings);
            if (_this.settings != undefined) {
                console.log('settings no es undefined');
                console.log("Seteo texto a negrita");
                doc.setFontStyle('bold');
                doc.text(20, 20, "Fecha: " + __WEBPACK_IMPORTED_MODULE_9_moment__().format('DD MMMM YYYY'));
                doc.text(20, 30, "Número de partes hoy : " + partesHoy);
                doc.text(20, 40, "Número de partes esta semana: " + partesSemana);
                doc.text(20, 50, "Número de partes este mes " + partesMes);
                doc.text(20, 60, "Número de partes este año: " + partesAnio);
                console.log(_this.settings.tecnico);
                if (_this.settings.tecnico != undefined || _this.settings.tecnico != "") {
                    doc.text(20, 70, "Trabajador: " + _this.settings.tecnico);
                    asuntoEmail = " de " + _this.settings.tecnico; // Esto es para luego rellenar el asunto del email
                }
                doc.text(20, 80, "Gráfica:");
                console.log("seteo fuente a normal");
                doc.setFontStyle('normal');
                if (barChart != undefined) {
                    console.log("La grafica está defininda, procedemos a pintarla");
                    doc.addImage(barChart, "PNG", 4, 100); // izq, arriba, ancho, alto
                }
                // doc.text(20, 90, "Número de partes este mes " +partesMes);
                doc.setFontSize(8);
                var tmpText = void 0;
                tmpText = "";
                if (_this.settings != undefined) {
                    if (_this.settings.empresa != null)
                        tmpText = _this.settings.empresa + "  ";
                    if (_this.settings.cif != null)
                        tmpText = tmpText + _this.settings.cif + "  ";
                    if (tmpText != "")
                        doc.text(20, 275, "Empresa proveedora de servicios: " + tmpText);
                }
                console.log("guardo el contenido del pdf (blob) en una variable");
                var pdfOutput = doc.output('blob');
                //preparamos el email según lleve o no adjunto (firma)
                console.log("PREPARAMOS EL EMAIL");
                if (_this.platform.is("cordova")) {
                    console.log('Creo el pdf');
                    var tmpNom_1 = Math.random().toString().replace('.', '');
                    tmpNom_1 = tmpNom_1 + 'partesTrabajoPdf.pdf';
                    tmpNom_1 = 'estadisticasTrabajoPdf.pdf';
                    _this.file.writeFile(_this.dirFiles, tmpNom_1, pdfOutput, { replace: true }).then(function (ok) {
                        console.log("fichero guardado en " + _this.dirFiles);
                        console.log(ok);
                        email = {
                            to: '',
                            subject: 'Estadísticas de partes de tabajo' + asuntoEmail,
                            body: "Adjuntamos estadísticas",
                            isHtml: true,
                            attachments: [_this.dirFiles + tmpNom_1]
                        };
                        _this.emailComposer.open(email).then(function (sended) {
                            console.log("email enviado ");
                            console.log(sended);
                            _this._varios.showToast("Email enviado", "top");
                        }, function (error) {
                            console.log("error enviando mensaje ");
                            _this._varios.showToast("Se produjo un error al enviar el Email", "top");
                            console.log(error);
                        });
                    }, function (err) {
                        console.log("error al guardar el fichero");
                        console.log(err);
                    });
                }
                else {
                    console.log("pdf(): cordova no disponible");
                }
            }
        }, function (error) {
            console.log("EmailComposer no está disponible");
            console.log("EmailComposer: ");
            console.log(error);
        });
    };
    return EstadisticasService;
}());
EstadisticasService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_6__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */]])
], EstadisticasService);

//# sourceMappingURL=estadisticas.service.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VariosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var VariosService = (function () {
    function VariosService(toastCtrl, file) {
        this.toastCtrl = toastCtrl;
        this.file = file;
    }
    VariosService.prototype.showToast = function (mensaje, posicion, cssClass, duration) {
        if (cssClass === void 0) { cssClass = "toastMessage"; }
        if (duration === void 0) { duration = 2000; }
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: posicion,
            cssClass: cssClass,
            duration: duration
        });
        toast.present();
    };
    /** Función que lista las bd. Solo probado con android. */
    VariosService.prototype.pathDatabasesSqlite = function () {
        console.log('ubicación de las bases de datos SQLITE. Solo probado con Android');
        this.file.listDir(cordova.file.applicationStorageDirectory, 'databases').then(function (files) {
            console.log('applicationStorageDirectory');
            console.log(files);
        }, function (error) {
            console.log('error');
            console.log(error);
        });
    };
    /** Función que recibe la url de una imagen, un función a la que hacer el callback
     * el tipo de imagen y el ancho máximo que debe tener esta.
     * Si es necesario, la función rota la imagen.
     * La función develve al callback la imagen en base64 para poder embeberla donde
     * sea necesario.
     */
    // imgToBase64(url: string, callback, outputformat = 'image/jpeg', maxImgWidth: number = 0) {
    //     //Declaración del  evento cuando seteamos la url del objeto Image 
    //     console.log('imgToBase64');
    //     let img = new Image();
    //     let base64img: string;
    //     img.crossOrigin = 'anonymous';
    //     img.onload = function () {
    //         console.log('img.onload');
    //         console.log(outputformat);
    //         var factor: number = 1;
    //         var canvas = <HTMLCanvasElement>document.createElement('CANVAS');
    //         var ctx = canvas.getContext('2d');
    //         var dataUrl: string;
    //         var widthImg;
    //         var heightImg;
    //         var rotar: boolean = false;
    //         //si maxImgWidth <> 0 entonces calculo un factor de redimensión.
    //         if (maxImgWidth > 0) {
    //             console.log("tamaño de la imagen: ancho " + this.width + " alto " + this.height);
    //             console.log('redimensiono el canvas con maxImgWidth recibido');
    //             factor = this.width / maxImgWidth;
    //             console.log("factor " + factor);
    //             console.log('dimensiones despues de resize ancho: ' + this.width / factor + ' - anchura: ' + this.height / factor);
    //         }
    //         widthImg = this.width / factor;
    //         heightImg = this.height / factor;
    //         canvas.height = heightImg;
    //         canvas.width = widthImg;
    //         EXIF.getData(this, function () {
    //             var orientation = EXIF.getTag(this, "Orientation");
    //             console.log("la orientación de la foto es : " + orientation);
    //             switch (orientation) {
    //                 case 8:
    //                     console.log('rotar');
    //                     rotar = true;
    //                     ctx.translate(canvas.width / 2, canvas.height / 2);
    //                     ctx.rotate(90 * Math.PI / 180);
    //                     break;
    //                 case 3:
    //                     console.log('rotar');
    //                     rotar = true;
    //                     ctx.translate(canvas.width / 2, canvas.height / 2);
    //                     ctx.rotate(180 * Math.PI / 180);
    //                     break;
    //                 case 6:
    //                     console.log('rotar');
    //                     rotar = true;
    //                     ctx.translate(canvas.width / 2, canvas.height / 2);
    //                     ctx.rotate(-90 * Math.PI / 180);
    //                     break;
    //             }
    //             if (rotar) {
    //                 ctx.drawImage(img, -widthImg / 2, -heightImg / 2, widthImg, heightImg);
    //                 dataUrl = canvas.toDataURL(outputformat);
    //                 base64img = dataUrl;
    //                 //base64img =  dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
    //                 callback(base64img);
    //             }
    //         });
    //         if (!rotar) {
    //             ctx.drawImage(img, 0, 0, widthImg, heightImg);
    //             dataUrl = canvas.toDataURL(outputformat);
    //             base64img = dataUrl;
    //             //base64img =  dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
    //             callback(base64img);
    //         }
    //     }
    //     /////////////////////////////////////////////////////////////////////
    //     img.src = url;
    // }
    /**Funcion que devuelve la fecha actual con el formato ISO.
     * Tras varias pruebas deduzco que el formato ISO no incluye la zona hoario por lo que siempre va a dar
     * la hora sin incrementar ni decrementar por zonas. Por ese motivo se obtiene a parte el timezoneOffset
     * y se suma a los minutos para finalmente devolver en formato ISO.
     * Se usa el formato iso porque hay componentes de formularios de ionic (ion-datatime) que lo necesitan.
     * return string
     */
    VariosService.prototype.getNowDateIso = function () {
        var now = new Date();
        var timezoneOffset = (now.getTimezoneOffset() * -1);
        var fechastr = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes() + timezoneOffset);
        console.log(fechastr);
        return fechastr.toISOString();
    };
    VariosService.prototype.getNowDate = function () {
        var now = new Date().toLocaleDateString();
        return now.toString();
    };
    VariosService.prototype.base64toBlob = function (base64Data, contentType) {
        contentType = contentType || '';
        var sliceSize = 1024;
        var byteCharacters = atob(base64Data);
        var bytesLength = byteCharacters.length;
        var slicesCount = Math.ceil(bytesLength / sliceSize);
        var byteArrays = new Array(slicesCount);
        for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
            var begin = sliceIndex * sliceSize;
            var end = Math.min(begin + sliceSize, bytesLength);
            var bytes = new Array(end - begin);
            for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                bytes[i] = byteCharacters[offset].charCodeAt(0);
            }
            byteArrays[sliceIndex] = new Uint8Array(bytes);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    return VariosService;
}());
VariosService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
], VariosService);

//# sourceMappingURL=varios.service.js.map

/***/ }),

/***/ 362:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_locale_es__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment_locale_es__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EstadisticasProvider = (function () {
    function EstadisticasProvider(_db) {
        this._db = _db;
        this.db = _db;
    }
    EstadisticasProvider.prototype.numeropartesdeldia = function (fechadia) {
        var _this = this;
        console.log("Obtencion de numero de partes del dia " + fechadia);
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select parte.fecha as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log('cargando partes');
                    var nump = 0;
                    for (var i = 0; i < data.rows.length; i++) {
                        var item = data.rows.item(i).n;
                        //console.log("Item -> "+item);
                        if (fechadia.isSame(_this.fechatomoment(item), 'day')) {
                            //console.log("LAS FECHAS COINCIDEN");	 
                            nump++;
                        }
                    }
                    console.log('Encontrados ' + nump + ' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                resolve(0);
            });
        });
    };
    EstadisticasProvider.prototype.numeropartesdelasemana = function (fechadia) {
        var _this = this;
        //console.log("Obtencion de numero de partes de la semana "+fechadia);
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select parte.fecha as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log('cargando partes');
                    var nump = 0;
                    for (var i = 0; i < data.rows.length; i++) {
                        var item = data.rows.item(i).n;
                        //	console.log("Semana fecha que paso -> "+fechadia.format('WW'));
                        //	console.log("Semana del parte -> "+this.fechatomoment(item).format('WW'));
                        if ((fechadia.format('WW')) == (_this.fechatomoment(item).format("WW"))) {
                            //if(fechadia.isSame(this.fechatomoment(item), 'week')){
                            //	 console.log("LAS SEMANAS COINCIDEN");	 
                            nump++;
                        }
                    }
                    //console.log('Encontrados '+nump+' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                resolve(0);
            });
        });
    };
    EstadisticasProvider.prototype.numeropartesdelmes = function (fechadia) {
        var _this = this;
        console.log("Obtencion de numero de partes del mes " + fechadia);
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select parte.fecha as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log('cargando partes');
                    var nump = 0;
                    for (var i = 0; i < data.rows.length; i++) {
                        var item = data.rows.item(i).n;
                        //console.log("Item -> "+item);
                        if (fechadia.isSame(_this.fechatomoment(item), 'month')) {
                            //console.log("LAS FECHAS COINCIDEN");	 
                            nump++;
                        }
                    }
                    console.log('Encontrados ' + nump + ' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                resolve(0);
            });
        });
    };
    EstadisticasProvider.prototype.numeropartesdelanio = function (fechadia) {
        var _this = this;
        console.log("Obtencion de numero de partes del año " + fechadia);
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select parte.fecha as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log('cargando partes');
                    var nump = 0;
                    for (var i = 0; i < data.rows.length; i++) {
                        var item = data.rows.item(i).n;
                        //console.log("Item -> "+item);
                        if (fechadia.isSame(_this.fechatomoment(item), 'year')) {
                            //console.log("LAS FECHAS COINCIDEN");	 
                            nump++;
                        }
                    }
                    console.log('Encontrados ' + nump + ' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                resolve(0);
            });
        });
    };
    EstadisticasProvider.prototype.numeropartesdias = function (dias) {
        var _this = this;
        console.log("Obtencion de numero de partes de los últimos " + dias + "días.");
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select parte.fecha as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    //console.log('cargando partes');
                    var nump = 0;
                    for (var i = 0; i < data.rows.length; i++) {
                        var item = data.rows.item(i).n;
                        //console.log("Item -> "+item);
                        if (_this.entrefechas(_this.fechatomoment(item), dias)) {
                            nump++;
                        }
                    }
                    console.log('Encontrados ' + nump + ' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                //console.log(error);
                resolve(0);
            });
        });
    };
    EstadisticasProvider.prototype.fechatomoment = function (fecha) {
        //console.log("Fecha -> "+fecha);
        var f = new Date(fecha);
        //console.log("F -> "+f);
        var fechastr = f.toLocaleDateString();
        //console.log("Fechastr -> "+fechastr);
        var fechamoment = __WEBPACK_IMPORTED_MODULE_2_moment__(f);
        //console.log("Moment -> "+fechamoment);
        var momento = fechamoment.format("YYYY-MM-DD HH:mm:ss");
        //console.log("Momento -> "+momento);
        return fechamoment;
    };
    EstadisticasProvider.prototype.momenttofecha = function (fecha) {
        //console.log("Moment -> "+fecha);
        var f = new Date(fecha);
        //console.log("Fecha -> "+f);
        return f;
    };
    EstadisticasProvider.prototype.entrefechas = function (fecha, dias) {
        var hoy = __WEBPACK_IMPORTED_MODULE_2_moment__(); // Fecha actual
        var diasantes = __WEBPACK_IMPORTED_MODULE_2_moment__().subtract(dias, 'days'); // Fecha hace "dias" dias.
        return fecha.isBetween(diasantes, hoy); // Si la fecha esta entre hoy y hace "dias" dias devuelvo true, si no, false
    };
    EstadisticasProvider.prototype.numeropartes = function () {
        var _this = this;
        console.log("Obtencion de numero total de partes actuales");
        var now = __WEBPACK_IMPORTED_MODULE_2_moment__().format('LLLL');
        console.log("Hora actual -> " + now);
        return new Promise(function (resolve) {
            var sql;
            sql = 'Select count(parte.id) as n from parte';
            _this.db.query(sql).then(function (data) {
                if (data.rows.length > 0) {
                    console.log('Data row -> ' + data.rows);
                    console.log('cargando partes');
                    var nump = data.rows.item(0).n;
                    console.log('Encontrados ' + nump + ' partes');
                    resolve(nump);
                }
                else {
                    resolve(0);
                }
            }).catch(function (error) {
                console.log("ERROR No se ha creado la base de datos!!");
                //console.log(error);
                resolve(0);
            });
        });
    };
    return EstadisticasProvider;
}());
EstadisticasProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__provider_database_provider__["a" /* DatabaseProvider */]])
], EstadisticasProvider);

//# sourceMappingURL=estadisticas.provider.js.map

/***/ }),

/***/ 364:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__clientes_cliente_list_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parte_parte_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__clientes_cliente_editar_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__settings_component_settings_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_settings_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__estadisticas_estadisticas__ = __webpack_require__(136);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = (function () {
    function HomePage(navCtrl, menu, v, platform, settings, file) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.v = v;
        this.settings = settings;
        this.file = file;
        //inicialización de variables
        this.menu.enable(true);
        this.dia = v.getNowDate();
        this.platform = platform;
        //seteo ids para anuncios según plataforma
        if (/(android)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: 'ca-app-pub-2437670687236295/4965506279',
            };
        }
        else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
            this.admobId = {
                banner: 'ca-app-pub-2437670687236295/1732838274',
            };
        }
    }
    HomePage.prototype.createBanner = function () {
        var _this = this;
        var muestroanuncios = true; // Elijo si quiero anuncios o no
        // console.log("Connection " + this.online.toString() + ". No creo el banner"); 
        this.platform.ready().then(function () {
            if (AdMob && muestroanuncios) {
                console.log("Creo el banner");
                console.log('AdMob disponible');
                AdMob.createBanner({
                    adId: _this.admobId.banner,
                    autoShow: true,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER
                });
            }
        });
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad');
        if (/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)) {
            this.platform.ready().then(function () {
                console.log('Platform ready');
                console.log(_this.platform);
                _this.createBanner();
            });
        }
    };
    HomePage.prototype.clientelist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__clientes_cliente_list_component__["a" /* ClienteListComponent */]);
    };
    HomePage.prototype.partelist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__parte_parte_list_component__["a" /* ParteListComponent */]);
    };
    HomePage.prototype.clienteedit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__clientes_cliente_editar_component__["a" /* ClienteEditarComponent */]);
    };
    HomePage.prototype.estadisticasmostrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__estadisticas_estadisticas__["a" /* EstadisticasPage */]);
    };
    HomePage.prototype.test = function () {
        console.log('test');
        this.file.listDir(cordova.file.applicationStorageDirectory, 'databases').then(function (files) {
            console.log('applicationStorageDirectory');
            console.log(files);
        }, function (error) {
            console.log('error');
            console.log(error);
        });
    };
    HomePage.prototype.showSettings = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__settings_component_settings_component__["a" /* SettingsComponent */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Partes de Trabajo\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="showSettings()">\n        <ion-icon name="ios-settings"> Ajustes</ion-icon>\n      </button>\n      <!-- <span [class.online]="online==true" [class.offline]="online==false"></span> -->\n    </ion-buttons>\n  </ion-navbar> \n</ion-header>\n\n<ion-content padding class="home">\n  <h2 style="text-align:center">{{dia}}</h2>\n  \n      <button ion-button icon-left block  (click)="clientelist()">\n        <ion-icon name="contact"></ion-icon>\n        Clientes\n      </button>\n      \n      <br>\n  \n      <button ion-button icon-left block  (click)="partelist()">\n        <ion-icon name="create"> </ion-icon> \n        Partes\n      </button>\n\n      <br>\n  \n      <button ion-button icon-left block  (click)="estadisticasmostrar()">\n        <ion-icon name="stats"> </ion-icon> \n        Estadísticas\n      </button>\n\n <!-- <h3 style="text-align:center">Número de partes actuales: {{numpartes}}</h3> -->   \n      <!--<button ion-button (click)="test()">aaaa</button>-->\n</ion-content>\n'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/home/home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_6__service_varios_service__["a" /* VariosService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_7__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_file__["a" /* File */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 365:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Cliente; });
var Cliente = (function () {
    function Cliente() {
        this.nombre = "";
        this.personaContacto = "";
        this.telefono = "";
        this.telefono2 = "";
        this.email = "";
        this.direccion = "";
        this.poblacion = "";
        this.cp = "";
        this.provincia = "";
        this.cif = "";
        this.observaciones = "";
    }
    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    Cliente.inicializa = function (values) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            var cliente = new Cliente();
            // console.log("parte inicializado a null")
            for (var p in values) {
                if (Object.getOwnPropertyDescriptor(values, p) != undefined) {
                    cliente[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return cliente;
        }
        catch (error) {
            alert("Cliente.inicializa " + error);
        }
    };
    return Cliente;
}());

//# sourceMappingURL=cliente.js.map

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parte; });
var Parte = (function () {
    function Parte() {
        this.trabajorealizado = "";
        this.personafirma = "";
    }
    Object.defineProperty(Parte.prototype, "fechaformato", {
        /** Getter para devolver la fecha en un formato legible y no en formato ISO
         * como se guarda en la base de datos.
         */
        get: function () {
            //console.log("fecha");
            var f = new Date(this.fecha);
            //console.log(f.toLocaleDateString());
            return f.toLocaleDateString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parte.prototype, "horainiformato", {
        get: function () {
            var hi = new Date(this.horaini);
            hi.setHours(hi.getHours(), hi.getMinutes() - (hi.getTimezoneOffset() * -1));
            return hi.toLocaleTimeString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parte.prototype, "horafinformato", {
        get: function () {
            var hf = new Date(this.horafin);
            hf.setHours(hf.getHours(), hf.getMinutes() - (hf.getTimezoneOffset() * -1));
            return hf.toLocaleTimeString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Parte.prototype, "firmaBase64", {
        /**Devuelve la firma en base64 (formato concreto que pide el plugin de cordova)
         * para poder insertarla en el email.
         * */
        get: function () {
            if (this.firma != null) {
                return this.firma.replace("data:image/png;base64,", "base64:firma.png//");
            }
            return '';
        },
        enumerable: true,
        configurable: true
    });
    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    Parte.inicializa = function (values) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            var parte = new Parte();
            // console.log("parte inicializado a null")
            // console.log(parte);
            for (var p in values) {
                // console.log(p);
                // console.log(Object.getOwnPropertyDescriptor(values, p));
                if (Object.getOwnPropertyDescriptor(values, p) != undefined) {
                    parte[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return parte;
        }
        catch (error) {
            alert("Parte.inicializa " + error);
        }
    };
    return Parte;
}());

//# sourceMappingURL=parte.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteFotosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_parte_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_photo__ = __webpack_require__(449);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ParteFotos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var ParteFotosPage = (function () {
    function ParteFotosPage(navCtrl, navParams, parteService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.parteService = parteService;
        this.parteid = navParams.get('parteid');
    }
    ParteFotosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ParteFotosPage');
        this.getFotos();
    };
    ParteFotosPage.prototype.getFotos = function () {
        var _this = this;
        this.fotos = [];
        this.parteService.cargaFotosParte(this.parteid).then(function (data) {
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.fotos[i] = __WEBPACK_IMPORTED_MODULE_3__model_photo__["a" /* Photo */].inicializa(data.rows.item(i));
                }
            }
        }).catch(function (error) {
            console.log('error cargando la fotos para mostrarlas');
        });
    };
    ParteFotosPage.prototype.borrarFoto = function (index) {
        this.parteService.borraFoto(index);
        this.getFotos();
        var el = document.getElementById(index);
        el.parentNode.removeChild(el);
    };
    ParteFotosPage.prototype.comparte = function () {
        if (this.fotos && this.fotos.length > 0)
            this.parteService.sharePhoto(this.fotos, this.parteid, "");
    };
    return ParteFotosPage;
}());
ParteFotosPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-parte-fotos',template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-fotos.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Fotos del parte nº {{parteid}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <div class="gridfotos">\n    <div *ngFor="let f of fotos" id="{{f.id}}" class="foto">\n      <img [src]="f.base64" >\n      <p class="text-center">{{f.nombre}}</p>\n      <button ion-button color="danger" icon-left block (click)="borrarFoto(f.id)" full> <ion-icon name="trash">  </ion-icon> Eliminar</button>\n    </div>\n  </div>  \n  <ion-fab top right edge>\n    <button ion-fab mini (click)="comparte()"><ion-icon name="md-share"></ion-icon></button>\n  </ion-fab>\n</ion-content>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-fotos.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_parte_service__["a" /* ParteService */]])
], ParteFotosPage);

//# sourceMappingURL=parte-fotos.js.map

/***/ }),

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_settings_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_settings__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(46);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var f;
/*
  Generated class for the SettingsComponent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SettingsComponent = (function () {
    function SettingsComponent(navCtrl, s, v, platform, camera, transfer, file) {
        this.navCtrl = navCtrl;
        this.s = s;
        this.v = v;
        this.platform = platform;
        this.camera = camera;
        this.transfer = transfer;
        this.file = file;
        this.logo = "";
    }
    SettingsComponent.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.platform.ready().then(function (ok) {
            console.log("inicializo FileTransfer");
            if (_this.platform.is('cordova')) {
                console.log('cordova');
                f = _this.transfer.create();
            }
        }, function (err) {
            console.log("Error al inicalizar FileTransfer");
        });
        if (this.platform.is('android')) {
            this.path = cordova.file.externalDataDirectory;
        }
        if (this.platform.is('ios')) {
            this.path = cordova.file.dataDirectory;
        }
        this.path = this.path + 'logo' + (Math.random() * 10).toString() + '.jpg';
    };
    SettingsComponent.prototype.ionViewCanEnter = function () {
        var _this = this;
        //Aunque el método estatico inicializa devuelve un objeto de tipo Settigs,
        //creo el objeto y llamo al constructor para que debido al asyncronismo
        //no sea null en cas de cargar el formulario antes de haber devuelto el objeto
        this.settings = new __WEBPACK_IMPORTED_MODULE_3__model_settings__["a" /* Settings */]();
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_3__model_settings__["a" /* Settings */].inicializa(tmp);
            _this.serie = _this.settings.serie;
            _this.logo = _this.settings.imagenBase64;
            console.log(_this.settings);
        });
    };
    SettingsComponent.prototype.submitForm = function () {
        console.log("Guardando settings");
        this.settings.imagen = this.logo;
        this.settings.imagenBase64 = this.logo;
        console.log(this.settings);
        this.s.save(this.settings);
        this.v.showToast("Configuración Guardada", "top");
        this.navCtrl.pop();
    };
    SettingsComponent.prototype.removeImage = function () {
        this.logo = "";
    };
    SettingsComponent.prototype.getCamera = function () {
        // let imageData: string = "https://dl.dropboxusercontent.com/u/960415/p-selfi.jpg";
        // let self = this;
        // this.v.imgToBase64(imageData,function(res){
        //         self.logo = res;
        //       },'image/jpeg',100);
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            correctOrientation: true,
            targetWidth: 100
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log('obteniendo imagen');
            console.log(imageData);
            var self = _this;
            // this.v.imgToBase64(imageData,function(res){
            //   self.logo = res;
            // },'image/jpeg',100);
        }, function (err) {
            console.log("Error al capturar imagen");
            console.log(err);
        });
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings-component',template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/settings-component/settings-component.html"*/'<!--\n  Generated template for the SettingsComponent page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Configuración</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="submitForm()">\n      <ion-list class="margin-list">\n        <ion-item>\n              <ion-label floating>Nombre del Técnico</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.tecnico" name="tecnico" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Serie</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.serie" name="serie" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Empresa</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.empresa" name="empresa" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Localidad</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.localidad" name="localidad" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Provincia</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.provincia" name="provincia" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>CP</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.cp" name="cp" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Cif</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.cif" name="cif" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Email</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.email" name="email" ></ion-input>\n        </ion-item>\n       \n        <ion-item>\n              <button ion-button type="submit" name="Guardar" >Guardar</button>\n        </ion-item>\n      </ion-list>\n  </form>\n  <h2 class="text-center">Carga el logo de tu empresa</h2>\n  <ion-grid>\n      <ion-row>\n            <ion-col class="text-center">   \n                  <img *ngIf="logo!=\'\'" [src]="logo" alt="" />\n            </ion-col> \n      </ion-row>\n      <ion-row>\n            <ion-col class="text-center">\n                  <button ion-button (click)="getCamera()">Cargar Logotipo</button>\n            </ion-col>\n      </ion-row>\n      <ion-row>  \n            <ion-col class="text-center">\n                  <button ion-button (click)="removeImage()" color="danger">Eliminar Logotipo</button>\n            </ion-col>      \n      </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/settings-component/settings-component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_4__service_varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
], SettingsComponent);

//# sourceMappingURL=settings-component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(400);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_estadisticas_service__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_estadisticas_estadisticas__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__provider_estadisticas_provider__ = __webpack_require__(362);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(448);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_clientes_cliente_list_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_clientes_cliente_editar_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_parte_parte_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_parte_parte_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_parte_parte_fotos__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__service_parte_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__service_cliente_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__service_settings_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_settings_component_settings_component__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_signaturepad__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_angular2_signaturepad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_angular2_signaturepad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__ionic_native_sqlite__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angular2_elastic__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_angular2_elastic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_angular2_elastic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__ = __webpack_require__(363);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_http__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_native_storage__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_storage__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_file__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_native_in_app_purchase_2__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_in_app_purchase__ = __webpack_require__(239);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_10__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_16__pages_parte_parte_list_component__["a" /* ParteListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_parte_parte_fotos__["a" /* ParteFotosPage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_clientes_cliente_list_component__["a" /* ClienteListComponent */],
            __WEBPACK_IMPORTED_MODULE_15__pages_clientes_cliente_editar_component__["a" /* ClienteEditarComponent */],
            __WEBPACK_IMPORTED_MODULE_17__pages_parte_parte_editar_component__["a" /* ParteEditarComponent */],
            __WEBPACK_IMPORTED_MODULE_23__pages_settings_component_settings_component__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__["a" /* VersionProPage */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_29__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_30__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {
                backButtonText: "Atras",
            }), __WEBPACK_IMPORTED_MODULE_24_angular2_signaturepad__["SignaturePadModule"], __WEBPACK_IMPORTED_MODULE_27_angular2_elastic__["ElasticModule"]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_11_ionic_angular__["b" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_13__pages_home_home__["a" /* HomePage */],
            __WEBPACK_IMPORTED_MODULE_14__pages_clientes_cliente_list_component__["a" /* ClienteListComponent */],
            __WEBPACK_IMPORTED_MODULE_15__pages_clientes_cliente_editar_component__["a" /* ClienteEditarComponent */],
            __WEBPACK_IMPORTED_MODULE_16__pages_parte_parte_list_component__["a" /* ParteListComponent */],
            __WEBPACK_IMPORTED_MODULE_18__pages_parte_parte_fotos__["a" /* ParteFotosPage */],
            __WEBPACK_IMPORTED_MODULE_17__pages_parte_parte_editar_component__["a" /* ParteEditarComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__["a" /* VersionProPage */],
            __WEBPACK_IMPORTED_MODULE_23__pages_settings_component_settings_component__["a" /* SettingsComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_19__service_varios_service__["a" /* VariosService */],
            __WEBPACK_IMPORTED_MODULE_21__service_cliente_service__["a" /* ClienteService */],
            __WEBPACK_IMPORTED_MODULE_20__service_parte_service__["a" /* ParteService */],
            __WEBPACK_IMPORTED_MODULE_7__service_estadisticas_service__["a" /* EstadisticasService */],
            __WEBPACK_IMPORTED_MODULE_28__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_9__provider_estadisticas_provider__["a" /* EstadisticasProvider */],
            __WEBPACK_IMPORTED_MODULE_25__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_26__provider_database_provider__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_22__service_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_31__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_native_in_app_purchase_2__["a" /* InAppPurchase2 */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_in_app_purchase__["a" /* InAppPurchase */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_32__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_storage__["a" /* IonicStorageModule */],
            { provide: __WEBPACK_IMPORTED_MODULE_10__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["c" /* IonicErrorHandler */] }]
    }),
    __metadata("design:paramtypes", [])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 447:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 248,
	"./af.js": 248,
	"./ar": 249,
	"./ar-dz": 250,
	"./ar-dz.js": 250,
	"./ar-kw": 251,
	"./ar-kw.js": 251,
	"./ar-ly": 252,
	"./ar-ly.js": 252,
	"./ar-ma": 253,
	"./ar-ma.js": 253,
	"./ar-sa": 254,
	"./ar-sa.js": 254,
	"./ar-tn": 255,
	"./ar-tn.js": 255,
	"./ar.js": 249,
	"./az": 256,
	"./az.js": 256,
	"./be": 257,
	"./be.js": 257,
	"./bg": 258,
	"./bg.js": 258,
	"./bn": 259,
	"./bn.js": 259,
	"./bo": 260,
	"./bo.js": 260,
	"./br": 261,
	"./br.js": 261,
	"./bs": 262,
	"./bs.js": 262,
	"./ca": 263,
	"./ca.js": 263,
	"./cs": 264,
	"./cs.js": 264,
	"./cv": 265,
	"./cv.js": 265,
	"./cy": 266,
	"./cy.js": 266,
	"./da": 267,
	"./da.js": 267,
	"./de": 268,
	"./de-at": 269,
	"./de-at.js": 269,
	"./de-ch": 270,
	"./de-ch.js": 270,
	"./de.js": 268,
	"./dv": 271,
	"./dv.js": 271,
	"./el": 272,
	"./el.js": 272,
	"./en-au": 273,
	"./en-au.js": 273,
	"./en-ca": 274,
	"./en-ca.js": 274,
	"./en-gb": 275,
	"./en-gb.js": 275,
	"./en-ie": 276,
	"./en-ie.js": 276,
	"./en-nz": 277,
	"./en-nz.js": 277,
	"./eo": 278,
	"./eo.js": 278,
	"./es": 56,
	"./es-do": 279,
	"./es-do.js": 279,
	"./es.js": 56,
	"./et": 280,
	"./et.js": 280,
	"./eu": 281,
	"./eu.js": 281,
	"./fa": 282,
	"./fa.js": 282,
	"./fi": 283,
	"./fi.js": 283,
	"./fo": 284,
	"./fo.js": 284,
	"./fr": 285,
	"./fr-ca": 286,
	"./fr-ca.js": 286,
	"./fr-ch": 287,
	"./fr-ch.js": 287,
	"./fr.js": 285,
	"./fy": 288,
	"./fy.js": 288,
	"./gd": 289,
	"./gd.js": 289,
	"./gl": 290,
	"./gl.js": 290,
	"./gom-latn": 291,
	"./gom-latn.js": 291,
	"./he": 292,
	"./he.js": 292,
	"./hi": 293,
	"./hi.js": 293,
	"./hr": 294,
	"./hr.js": 294,
	"./hu": 295,
	"./hu.js": 295,
	"./hy-am": 296,
	"./hy-am.js": 296,
	"./id": 297,
	"./id.js": 297,
	"./is": 298,
	"./is.js": 298,
	"./it": 299,
	"./it.js": 299,
	"./ja": 300,
	"./ja.js": 300,
	"./jv": 301,
	"./jv.js": 301,
	"./ka": 302,
	"./ka.js": 302,
	"./kk": 303,
	"./kk.js": 303,
	"./km": 304,
	"./km.js": 304,
	"./kn": 305,
	"./kn.js": 305,
	"./ko": 306,
	"./ko.js": 306,
	"./ky": 307,
	"./ky.js": 307,
	"./lb": 308,
	"./lb.js": 308,
	"./lo": 309,
	"./lo.js": 309,
	"./lt": 310,
	"./lt.js": 310,
	"./lv": 311,
	"./lv.js": 311,
	"./me": 312,
	"./me.js": 312,
	"./mi": 313,
	"./mi.js": 313,
	"./mk": 314,
	"./mk.js": 314,
	"./ml": 315,
	"./ml.js": 315,
	"./mr": 316,
	"./mr.js": 316,
	"./ms": 317,
	"./ms-my": 318,
	"./ms-my.js": 318,
	"./ms.js": 317,
	"./my": 319,
	"./my.js": 319,
	"./nb": 320,
	"./nb.js": 320,
	"./ne": 321,
	"./ne.js": 321,
	"./nl": 322,
	"./nl-be": 323,
	"./nl-be.js": 323,
	"./nl.js": 322,
	"./nn": 324,
	"./nn.js": 324,
	"./pa-in": 325,
	"./pa-in.js": 325,
	"./pl": 326,
	"./pl.js": 326,
	"./pt": 327,
	"./pt-br": 328,
	"./pt-br.js": 328,
	"./pt.js": 327,
	"./ro": 329,
	"./ro.js": 329,
	"./ru": 330,
	"./ru.js": 330,
	"./sd": 331,
	"./sd.js": 331,
	"./se": 332,
	"./se.js": 332,
	"./si": 333,
	"./si.js": 333,
	"./sk": 334,
	"./sk.js": 334,
	"./sl": 335,
	"./sl.js": 335,
	"./sq": 336,
	"./sq.js": 336,
	"./sr": 337,
	"./sr-cyrl": 338,
	"./sr-cyrl.js": 338,
	"./sr.js": 337,
	"./ss": 339,
	"./ss.js": 339,
	"./sv": 340,
	"./sv.js": 340,
	"./sw": 341,
	"./sw.js": 341,
	"./ta": 342,
	"./ta.js": 342,
	"./te": 343,
	"./te.js": 343,
	"./tet": 344,
	"./tet.js": 344,
	"./th": 345,
	"./th.js": 345,
	"./tl-ph": 346,
	"./tl-ph.js": 346,
	"./tlh": 347,
	"./tlh.js": 347,
	"./tr": 348,
	"./tr.js": 348,
	"./tzl": 349,
	"./tzl.js": 349,
	"./tzm": 350,
	"./tzm-latn": 351,
	"./tzm-latn.js": 351,
	"./tzm.js": 350,
	"./uk": 352,
	"./uk.js": 352,
	"./ur": 353,
	"./ur.js": 353,
	"./uz": 354,
	"./uz-latn": 355,
	"./uz-latn.js": 355,
	"./uz.js": 354,
	"./vi": 356,
	"./vi.js": 356,
	"./x-pseudo": 357,
	"./x-pseudo.js": 357,
	"./yo": 358,
	"./yo.js": 358,
	"./zh-cn": 359,
	"./zh-cn.js": 359,
	"./zh-hk": 360,
	"./zh-hk.js": 360,
	"./zh-tw": 361,
	"./zh-tw.js": 361
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 447;

/***/ }),

/***/ 448:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_estadisticas_estadisticas__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(364);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_clientes_cliente_list_component__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_parte_parte_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase_2__ = __webpack_require__(393);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = (function () {
    function MyApp(platform, menu, db, statusBar, inAppPurchase2) {
        var _this = this;
        this.menu = menu;
        this.db = db;
        this.statusBar = statusBar;
        this.inAppPurchase2 = inAppPurchase2;
        //Seteo pagina inicial
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        //Seteo rutas para usar en sidemenu
        this.pages = [
            {
                title: "Inicio",
                component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */]
            },
            {
                title: "Listado de clientes",
                component: __WEBPACK_IMPORTED_MODULE_6__pages_clientes_cliente_list_component__["a" /* ClienteListComponent */]
            },
            {
                title: "Listado de partes",
                component: __WEBPACK_IMPORTED_MODULE_7__pages_parte_parte_list_component__["a" /* ParteListComponent */]
            },
            {
                title: "Estadisticas",
                component: __WEBPACK_IMPORTED_MODULE_1__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */]
            },
            {
                title: "Version pro",
                component: __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__["a" /* VersionProPage */]
            },
        ];
        platform.ready().then(function () {
            console.log(platform.platforms());
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            // this.inAppPurchase2.register({
            //   id: "com.goltratec.partestrabajo.versionpro",
            //   alias: "Versión pro partes de trabajo ",
            //   type: this.inAppPurchase2.NON_CONSUMABLE
            // });
            // var p = this.inAppPurchase2.get("Versión pro partes de trabajo ");
            /* this.inAppPurchase2.ready().then(() => {
       
               console.log("TIENDA LISTA");
             });
       
             var productoTienda = this.inAppPurchase2.get("com.goltratec.partestrabajo.versionpro");*/
            /*this.inAppPurchase2.when("Versión pro partes de trabajo").approved(function(productoTienda) {
              // download the feature
              console.log("COMPRA VERSION PRO");
              //app.downloadExtraChapter().then(function() {
               //   product.finish();
              //});
          });
         */
            //inicializa la bd creando el fichero de bd pero no la estructura.
            _this.db.dbname = "partes1";
            _this.db.init();
            var sqlcrearfotos;
            var camposCliente;
            camposCliente = ["id", "nombre", "personaContacto", "telefono", "telefono2", "email", "direccion", "poblacion", "cp", "provincia", "cif", "observaciones", "prueba"];
            var camposBdCliente = [];
            _this.db.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, personaContacto TEXT, telefono TEXT, telefono2 TEXT, email TEXT, direccion TEXT, poblacion TEXT, cp TEXT, provincia TEXT, cif TEXT, observaciones TEXT);').then(function (data) {
                console.log("Crear tabla cliente");
                _this.db.query('PRAGMA database_list;').then(function (data) {
                    console.log('Obteniendo nombre de la base de datos...');
                    console.log(data.rows.item(0).name);
                    var nomBd = data.rows.item(0).name;
                    var queryCliente = 'PRAGMA ' + nomBd + '.table_info(cliente);';
                    _this.db.query(queryCliente).then(function (data) {
                        console.log("Obteniendo campos de la tabla cliente...");
                        //console.log(data);
                        for (var i = 0; i < data.rows.length; i++) {
                            var campo = data.rows.item(i).name;
                            console.log(campo);
                            camposBdCliente.push(campo);
                        }
                        for (var i = 0; i < camposCliente.length; i++) {
                            if (camposBdCliente.some(function (elem) { return elem == camposCliente[i]; })) {
                                console.log("El elemento " + camposCliente[i] + " está contenido en el array");
                            }
                            else {
                                console.log("El elemento " + camposCliente[i] + " ¡NO! está contenido en el array, por lo que procedo a añadirlo a la tabla clientes...");
                                var queryCampoNuevo = 'ALTER TABLE cliente ADD COLUMN ' + camposCliente[i] + ' TEXT;';
                                _this.db.query(queryCampoNuevo).then(function (data) {
                                    console.log("Añado campo a la tabla clientes de la BD");
                                }, function (error) {
                                    console.log("Error añadiendo campo a la tabla clientes de la BD");
                                    console.log(error);
                                });
                            }
                        }
                    }, function (error) {
                        console.log('Error obteniendo el nombre de los campos.');
                        console.log(error);
                    });
                }, function (error) {
                    console.log('Error obteniendo nombre de la base de datos.');
                    console.log(error);
                });
            }, function (error) {
                console.log("Error al crear la tabla cliente: ");
                console.log(error);
            });
            _this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(function (success) {
                console.log('no existe tabla parte y la creo');
                console.log(success);
            }, function (error) {
                console.log("Error al crear la tabla parte: " + error);
            });
            sqlcrearfotos = "CREATE TABLE IF NOT EXISTS fotos (id INTEGER PRIMARY KEY AUTOINCREMENT, parteid INTEGER CONSTRAINT fk_parteid REFERENCES parte (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, base64 TEXT, nombre TEXT)";
            _this.db.query(sqlcrearfotos).then(function (success) {
                console.log('no existe tabla foto y la creo');
                console.log(success);
            }, function (error) {
                console.log('error al crear tabla fotos');
                console.log(error);
            });
        });
    }
    MyApp.prototype.openPage = function (p) {
        this.menu.close();
        console.log(p);
        this.nav.setRoot(p.component);
    };
    return MyApp;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["e" /* MenuController */], __WEBPACK_IMPORTED_MODULE_8__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase_2__["a" /* InAppPurchase2 */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 449:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Photo; });
var Photo = (function () {
    function Photo() {
        this.base64 = "";
        this.nombre = "";
    }
    Photo.inicializa = function (values) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            var parte = new Photo();
            // console.log("parte inicializado a null")
            // console.log(parte);
            for (var p in values) {
                // console.log(p);
                // console.log(Object.getOwnPropertyDescriptor(values, p));
                if (Object.getOwnPropertyDescriptor(values, p) != undefined) {
                    parte[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return parte;
        }
        catch (error) {
            alert("Photo.inicializa " + error);
        }
    };
    return Photo;
}());

//# sourceMappingURL=photo.js.map

/***/ }),

/***/ 47:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var DatabaseProvider = (function () {
    function DatabaseProvider() {
        this.dbname = 'YourDBName.db';
    }
    /**
     * Init - init database etc. PS! Have to wait for Platform.ready
     */
    DatabaseProvider.prototype.init = function () {
        var _this = this;
        console.log("Init DatabaseProvider, a cotinuación tipo de dispositivo.");
        return new Promise(function (resolve) {
            if (typeof window.sqlitePlugin !== 'undefined') {
                _this.db = window.sqlitePlugin.openDatabase({ name: _this.dbname, location: 'default' });
                //console.log("--> running on device: ", this.db);
            }
            else {
                _this.db = window.openDatabase(_this.dbname, '1.0', 'Test DB', -1);
                //console.log("--> running in browser: ", this.db);
            }
            ;
        });
    };
    /**
     * query - executes sql
     */
    DatabaseProvider.prototype.query = function (q, params) {
        var _this = this;
        console.log("DatabaseProvider: ejecutando query() -> " + q);
        return new Promise(function (resolve, reject) {
            params = params || [];
            _this.db.transaction(function (tx) {
                tx.executeSql(q, params, function (tx, res) {
                    resolve(res);
                }, function (tx, err) {
                    reject(err);
                });
            });
        });
    };
    return DatabaseProvider;
}());
DatabaseProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [])
], DatabaseProvider);

//# sourceMappingURL=database.provider.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_varios_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var SettingsService = (function () {
    function SettingsService(storage, v) {
        this.storage = storage;
        this.v = v;
    }
    SettingsService.prototype.getData = function () {
        console.log("recupera settings");
        return this.storage.get('settings');
    };
    SettingsService.prototype.save = function (data) {
        var newData;
        newData = JSON.stringify(data);
        console.log("Guardar settings");
        console.log(data);
        newData = JSON.stringify(data);
        console.log("Guardar settings sin b64");
        console.log(newData);
        this.guardar(newData);
    };
    SettingsService.prototype.guardar = function (newData) {
        console.log('Settings.service. guardar(newData)');
        this.storage.set('settings', newData);
    };
    return SettingsService;
}());
SettingsService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_2__service_varios_service__["a" /* VariosService */]])
], SettingsService);

//# sourceMappingURL=settings.service.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cliente_editar_component__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parte_parte_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_cliente__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_cliente_service__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_varios_service__ = __webpack_require__(30);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ClienteListComponent = (function () {
    function ClienteListComponent(navCtrl, navParams, _clienteService, alertCtrl, variosService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._clienteService = _clienteService;
        this.alertCtrl = alertCtrl;
        this.variosService = variosService;
    }
    ClienteListComponent.prototype.ngOnInit = function () {
        this.listaClientes();
    };
    ClienteListComponent.prototype.listaClientes = function () {
        var _this = this;
        console.log("Listado de clientes");
        //console.log(this._clienteService.listaClientes());
        this._clienteService.listaClientes().then(function (data) {
            _this.clientes = [];
            console.log(data.rows);
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows.item(i);
                    _this.clientes.push(__WEBPACK_IMPORTED_MODULE_4__model_cliente__["a" /* Cliente */].inicializa(item));
                }
            }
        }, function (error) {
            console.log(error);
        });
    };
    ClienteListComponent.prototype.cargaCliente = function (cliente) {
        console.log('carga cliente');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cliente_editar_component__["a" /* ClienteEditarComponent */], [cliente]);
    };
    ClienteListComponent.prototype.crearCliente = function () {
        console.log('crea cliente');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__cliente_editar_component__["a" /* ClienteEditarComponent */]);
    };
    ClienteListComponent.prototype.borrarCliente = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Borrar Cliente',
            message: 'Va a borrar un cliente. Esta acción no puede deshacerse. ¿Deesea continuar?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('borrar NO');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        console.log('borrar SI');
                        _this._clienteService.borrarCliente(id).then(function (data) {
                            console.log(data.res);
                            _this.variosService.showToast("Cliente eliminado", "top");
                            _this.listaClientes();
                        }, function (error) {
                            console.log(error);
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ClienteListComponent.prototype.crearParte = function (clienteid, nombre) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__parte_parte_editar_component__["a" /* ParteEditarComponent */], { clienteid: clienteid, nombre: nombre });
    };
    ClienteListComponent.prototype.llamar = function (telefono) {
        cordova.InAppBrowser.open("tel:" + telefono, "_system", "location=true");
    };
    return ClienteListComponent;
}());
ClienteListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/clientes/cliente-list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Clientes</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n\n  <ion-row>\n    <ion-col>\n      <button ion-button full (click)=\'crearCliente()\'>Añadir cliente</button>\n    </ion-col>\n  </ion-row>\n\n  <ion-row *ngFor="let cliente of clientes">\n    <ion-col>\n      <p style="line-height: 30px">\n        <strong>{{cliente.id}} - {{cliente.nombre}}</strong>\n        <button ion-button color="dark" *ngIf="cliente.telefono.length>0" (click)="llamar(cliente.telefono);" style="float:right">\n          <ion-icon color="secondary" name="call" ></ion-icon>\n       </button>\n      </p>\n      <ion-row>\n        <ion-col>\n          <button full ion-button outline (click)="crearParte(cliente.id,cliente.nombre)">\n              <ion-icon name="md-document" ></ion-icon>\n                Crear Parte\n            </button>\n        </ion-col>\n        <ion-col>\n          <button full ion-button color="danger" (click)="borrarCliente(cliente.id)">\n              <ion-icon name="trash" ></ion-icon>\n                Eliminar\n            </button>\n        </ion-col>\n        <ion-col>\n          <button full ion-button color="default" (click)="cargaCliente(cliente)">\n              <ion-icon name="arrow-dropright" ></ion-icon>\n                Editar\n            </button>\n        </ion-col>\n      </ion-row>\n    </ion-col>\n  </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/clientes/cliente-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__service_cliente_service__["a" /* ClienteService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__service_cliente_service__["a" /* ClienteService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__service_varios_service__["a" /* VariosService */]])
], ClienteListComponent);

//# sourceMappingURL=cliente-list.component.js.map

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_settings__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_service__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(132);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var ParteService = (function () {
    function ParteService(_varios, _db, platform, s, emailComposer, socialSharing, file) {
        this._varios = _varios;
        this.platform = platform;
        this.s = s;
        this.emailComposer = emailComposer;
        this.socialSharing = socialSharing;
        this.file = file;
        this.db = _db;
        this.dirFiles = "";
        console.log("constructor ParteService");
        /* this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
           (success) => {
             console.log('no existe tabla parte y la creo');
             console.log(success);
           },
           (error) => {
             console.log("Error al crear la tabla parte: " + error);
           }
         );
     
         let sql: string;
         sql = "CREATE TABLE IF NOT EXISTS fotos (id INTEGER PRIMARY KEY AUTOINCREMENT, parteid INTEGER CONSTRAINT fk_parteid REFERENCES parte (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, base64 TEXT, nombre TEXT)";
         this.db.query(sql).then(
           success => {
             console.log('no existe tabla foto y la creo');
             console.log(success);
           },
           error => {
             console.log('error al crear tabla fotos');
             console.log(error);
           }
         );*/
        //seteo directorio para guardar ficheros.
        if (this.platform.is("ios")) {
            console.log('Directorio para ios');
            this.dirFiles = cordova.file.tempDirectory;
        }
        if (this.platform.is("android")) {
            console.log("Directorio para android");
            this.dirFiles = cordova.file.externalDataDirectory;
        }
        console.log(this.dirFiles);
    }
    ParteService.prototype.listaPartes = function () {
        var _this = this;
        var sql;
        sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id order by parte.id desc';
        //ademas de listar los partes, aquí cargamos los settings. Si están en el constructor solo se cargan
        //una vez de modo que si se modifican mientras la aplicación está abierto no refrescan los valores a
        //la hora de usarlos.
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            console.log("cargo valores settings");
            _this.settings = __WEBPACK_IMPORTED_MODULE_2__model_settings__["a" /* Settings */].inicializa(tmp);
            console.log(_this.settings);
        });
        return this.db.query(sql);
    };
    ParteService.prototype.cargaFotosParte = function (parteid) {
        var sql;
        sql = 'Select * from fotos where parteid=?';
        return this.db.query(sql, [parteid]);
    };
    ParteService.prototype.elimina = function (parteid) {
        var sql;
        sql = 'delete from parte where id=?';
        return this.db.query(sql, [parteid]);
    };
    ParteService.prototype.actualizaParte = function (f, photos) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var sql;
            console.log('actualizaParte()');
            //datos
            if (f.id == null) {
                sql = "insert into parte values (?,?,?,?,?,?,?,?)";
            }
            else {
                sql = "update parte set id=?,clienteid=?,fecha=?,horaini=?,horafin=?,trabajorealizado=?,personafirma=?,firma=? where id=" + f.id;
            }
            //insert / update datos
            _this.db.query(sql, [f.id, f.clienteid, f.fecha, f.horaini, f.horafin, f.trabajorealizado, f.personafirma, f.firma]).then(function (data) {
                _this._varios.showToast("Parte guardado correctamente", "top");
                console.log("Insertado parte ");
                console.log(sql);
                console.log(data);
                if (f.id == null && data)
                    f.id = data.insertId;
            }).then(//fotos
            function (fotosData) {
                resolve(f.id);
                if (photos.length == 0) {
                    console.log('photos length 0, no hay fotos para guardar');
                    return false;
                }
                var photosql = "";
                console.log('vamos a guardar las fotos');
                for (var p in photos) {
                    var obj = photos[p];
                    //id=0 indica que es una foto para insertar
                    if (obj.id == 0) {
                        photosql = "insert into fotos values (?,?,?,?)";
                    }
                    else {
                        photosql = "update fotos set id=?,parteid=?,base64=?,nombre=? where parteid=" + f.id + " and id=" + obj.id;
                    }
                    //insert / update fotos
                    console.log('f.id: ' + f.id);
                    console.log(photosql);
                    _this.db.query(photosql, [null, f.id, obj.base64, obj.nombre]).then(function (success) {
                        console.log('Fotos guardadas correctamente');
                    }, function (error) {
                        console.log('Error guardando las fotos');
                        console.log(error);
                    });
                }
            }).catch(function (error) {
                console.log(error);
                reject("Error guardando el parte y las fotos");
            });
        });
    };
    ParteService.prototype.borraFoto = function (index) {
        var _this = this;
        var sql = "delete from fotos where id=?";
        this.db.query(sql, [index]).then(function (success) {
            _this._varios.showToast('Foto eliminada correctamente', 'top');
        }).catch(function (error) {
            _this._varios.showToast('Hubo un problema eliminado la foto', 'top', 'toastError', 200000);
        });
    };
    ParteService.prototype.enviaPorEmail = function (parte) {
        var _this = this;
        //let msg:String; 
        var email;
        var doc = new jsPDF();
        var serieId;
        console.log("Compruebo si el componente EmailComposer está disponible.");
        this.emailComposer.isAvailable().then(function (available) {
            console.log("Email composer disponible");
            console.log("Texto que voy a incluir en pdf");
            console.log(_this.settings);
            if (_this.settings != undefined) {
                console.log('settings no es undefined');
                console.log(_this.settings.serie);
                if (_this.settings.serie != undefined) {
                    serieId = (_this.settings.serie.length > 0 ? (_this.settings.serie + "/" + String(parte.id)) : String(parte.id));
                }
                else {
                    serieId = String(parte.id);
                }
                if (_this.settings.imagenBase64 != undefined && _this.settings.imagenBase64.length > 0) {
                    doc.addImage(_this.settings.imagenBase64, "JPEG", 140, 20);
                }
                console.log("Seteo texto a negrita");
                doc.setFontStyle('bold');
                doc.text(20, 20, "Parte de Trabajo Número " + serieId);
                doc.text(20, 30, "Cliente: " + parte.nombre);
                doc.text(20, 40, "Fecha: " + parte.fechaformato);
                doc.text(20, 50, "Horas: " + parte.horainiformato + ' a ' + parte.horafinformato);
                if (_this.settings.tecnico != undefined)
                    doc.text(20, 60, "Le atendió: " + _this.settings.tecnico);
                doc.text(20, 70, "Trabajo Realizado");
                console.log("seteo fuente a normal");
                doc.setFontStyle('normal');
                console.log("parte.trabajorealizado -> " + (parte.trabajorealizado == null ? "" : parte.trabajorealizado));
                console.log("parto el texto trabajorealizado en lineas ");
                doc.text(20, 80, doc.splitTextToSize((parte.trabajorealizado == null ? "" : parte.trabajorealizado), 180));
                console.log("compruebo si hay firma");
                if (parte.firma != null) {
                    doc.setFontStyle('bold');
                    doc.text(20, 200, "Firmado por: ");
                    doc.setFontStyle('normal');
                    if (parte.personafirma != null)
                        doc.text(20, 210, parte.personafirma);
                    console.log("añado la firma al pdf");
                    doc.addImage(parte.firma, 'PNG', 20, 220, 50, 50);
                }
                doc.setFontSize(8);
                var tmpText = void 0;
                tmpText = "";
                if (_this.settings != undefined) {
                    if (_this.settings.empresa != null)
                        tmpText = _this.settings.empresa + "  ";
                    if (_this.settings.cif != null)
                        tmpText = tmpText + _this.settings.cif + "  ";
                    if (tmpText != "")
                        doc.text(20, 275, "Empresa proveedora de servicios: " + tmpText);
                }
                console.log("guardo el contenido del pdf (blob) en una variable");
                var pdfOutput = doc.output('blob');
                //preparamos el email según lleve o no adjunto (firma)
                if (_this.platform.is("cordova")) {
                    console.log('Creo el pdf');
                    var tmpNom_1 = Math.random().toString().replace('.', '');
                    tmpNom_1 = tmpNom_1 + 'partesTrabajoPdf.pdf';
                    tmpNom_1 = 'partesTrabajoPdf.pdf';
                    _this.file.writeFile(_this.dirFiles, tmpNom_1, pdfOutput, { replace: true }).then(function (ok) {
                        console.log("fichero guardado en " + _this.dirFiles);
                        console.log(ok);
                        email = {
                            to: '',
                            subject: 'Parte de trabajo nº ' + serieId,
                            body: "Adjuntamos su parte de trabajo",
                            isHtml: true,
                            attachments: [_this.dirFiles + tmpNom_1]
                        };
                        _this.emailComposer.open(email).then(function (sended) {
                            console.log("email enviado ");
                            console.log(sended);
                            _this._varios.showToast("Email enviado", "top");
                        }, function (error) {
                            console.log("error enviando mensaje ");
                            _this._varios.showToast("Se produjo un error al enviar el Email", "top");
                            console.log(error);
                        });
                    }, function (err) {
                        console.log("error al guardar el fichero");
                        console.log(err);
                    });
                }
                else {
                    console.log("pdf(): cordova no disponible");
                }
            }
        }, function (error) {
            console.log("EmailComposer no está disponible");
            console.log("EmailComposer: ");
            console.log(error);
        });
    };
    ParteService.prototype.sharePhoto = function (photos, idParte, nomcliente) {
        var _this = this;
        var body = "Cliente: " + nomcliente;
        var subject = "Foto del parte: " + idParte;
        var imgB64Ray = [];
        body += " - Parte nº " + idParte;
        console.log("fotos recibida");
        for (var _i = 0, photos_1 = photos; _i < photos_1.length; _i++) {
            var photo = photos_1[_i];
            //añado cada foto a un array
            var tmpB64 = photo.base64.split(",");
            imgB64Ray.push({ 'nombre': photo.nombre, 'base64': tmpB64[1] });
        }
        //guardo las imagenes en un directorio para enviarlas luego
        this.imgToArrayAndSave(imgB64Ray).then(function (data) {
            console.log('Procedo a compartir');
            return (data);
        }).then(function (data) {
            console.log(data);
            _this.socialSharing.share(body, subject, data).then(function (res) {
                console.log('Comparto');
                console.log(res);
            }).catch(function (error) {
                console.log('error compartiendo');
                console.log(error);
            });
        }).catch(function (error) {
            console.log('Error');
            console.log(error);
        });
    };
    ParteService.prototype.imgToArrayAndSave = function (imgB64Ray) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var imgRay;
            imgRay = [];
            for (var _i = 0, imgB64Ray_1 = imgB64Ray; _i < imgB64Ray_1.length; _i++) {
                var img = imgB64Ray_1[_i];
                var obj = _this._varios.base64toBlob(img.base64, 'image\jpg');
                var preNombre = Math.random().toString().replace('.', '');
                var nomTmp = preNombre + img.nombre + '.jpg';
                imgRay.push(_this.dirFiles + "/" + nomTmp);
                _this.file.writeFile(_this.dirFiles, nomTmp, obj, { replace: true }).then(function (success) {
                    console.log('fichero guardado');
                    console.log(success);
                }).catch(function (error) {
                    console.log('error al guardar el fichero');
                    reject(error);
                    console.log(error);
                });
            }
            resolve(imgRay);
            console.log('fin for');
        });
    };
    return ParteService;
}());
ParteService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_7__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
], ParteService);

//# sourceMappingURL=parte.service.js.map

/***/ }),

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_parte_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parte_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_parte__ = __webpack_require__(366);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ParteListComponent = (function () {
    function ParteListComponent(navCtrl, parteService, varios, alertCtrl) {
        this.navCtrl = navCtrl;
        this.parteService = parteService;
        this.varios = varios;
        this.alertCtrl = alertCtrl;
        this.listadoPartes();
    }
    ParteListComponent.prototype.listadoPartes = function () {
        var _this = this;
        this.parteService.listaPartes().then(function (data) {
            console.log('cargando partes');
            // console.log('Encontrados '+data.rows.length+' partes');
            _this.partes = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    var item = data.rows.item(i);
                    _this.partes.push(__WEBPACK_IMPORTED_MODULE_5__model_parte__["a" /* Parte */].inicializa(item));
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__parte_editar_component__["a" /* ParteEditarComponent */], [parte]);
    };
    ParteListComponent.prototype.crearParte = function (clienteid) {
        console.log('crearParte()');
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__parte_editar_component__["a" /* ParteEditarComponent */]);
    };
    ParteListComponent.prototype.eliminaParte = function (parteid) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'Borrar Parte',
            message: 'Va a borrar el parte de trabajo. Esta acción no puede deshacerse. ¿Desea continuar?',
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('borrar NO');
                    }
                },
                {
                    text: 'Si',
                    handler: function () {
                        console.log('borrar SI');
                        _this.parteService.elimina(parteid).then(function (data) {
                            _this.varios.showToast("Parte Eliminado", "top");
                            _this.listadoPartes();
                        });
                    }
                }
            ]
        });
        confirm.present();
    };
    ParteListComponent.prototype.enviarEmail = function (parte) {
        console.log('envia email');
        this.parteService.enviaPorEmail(parte);
    };
    return ParteListComponent;
}());
ParteListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-list.component.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Partes</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <h3 class="text-center">Listado de partes de trabajo</h3>\n\n  <ion-row *ngFor="let p of partes" class="transparente">\n    <ion-col>\n      <button class="" ion-item icon-left (click)="cargaParte(p)">  \n        <ion-icon class="verde" *ngIf="p.firmaBase64!=\'\'" name="checkmark-circle-outline"></ion-icon>\n        {{p.id}} - {{p.nombre}} - {{p.fechaformato}} - {{p.horainiformato}}\n      </button>\n      <ion-row>\n        <ion-col>\n          <button full ion-button color="danger" (click)="eliminaParte(p.id)">\n            <ion-icon name="trash"></ion-icon>\n              Eliminar\n          </button>\n        </ion-col>\n        <ion-col>\n          <button full ion-button (click)="enviarEmail(p)">\n            <ion-icon name="mail"></ion-icon>\n              Enviar\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-col>\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"/Users/Joaquin/ionic2partes/src/pages/parte/parte-list.component.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_parte_service__["a" /* ParteService */],
        __WEBPACK_IMPORTED_MODULE_3__service_varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], ParteListComponent);

//# sourceMappingURL=parte-list.component.js.map

/***/ })

},[395]);
//# sourceMappingURL=main.js.map