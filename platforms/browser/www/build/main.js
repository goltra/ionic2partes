webpackJsonp([0],{

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__service_estadisticas_service__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_estadisticas_provider__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_locale_es__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment_locale_es___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment_locale_es__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__ = __webpack_require__(368);
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
        selector: 'page-estadisticas',template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/estadisticas/estadisticas.html"*/'<!--\n  Generated template for the Estadisticas page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n     <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Estadísticas</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <h2 style="text-align:center">Total de partes hoy: {{numparteshoy}}</h2>\n  <h3 style="text-align:center">Esta semana: {{numpartesdelasemana}} | Este mes {{numpartesmes}} | Este año: {{numpartesanio}}</h3>   \n\n<ion-card>\n      <ion-card-header>\n       <h3> Número de partes de los últimos {{dias}} días</h3> \n      </ion-card-header>\n      <ion-card-content>\n        <canvas #barCanvas></canvas>\n      \n      <button full ion-button icon-left block (click)="enviarEmail()">\n            <ion-icon name="mail"></ion-icon>\n              Enviar\n          </button>\n            </ion-card-content>\n    </ion-card>\n    \n</ion-content>\n'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/estadisticas/estadisticas.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__provider_estadisticas_provider__["a" /* EstadisticasProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_screen_orientation__["a" /* ScreenOrientation */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__service_estadisticas_service__["a" /* EstadisticasService */]])
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

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteEditarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_cliente__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_cliente_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cliente_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_settings__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_forms__ = __webpack_require__(24);
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
    function ClienteEditarComponent(_nav, _navParams, fb, s, clienteService, _varios) {
        this._nav = _nav;
        this._navParams = _navParams;
        this.fb = fb;
        this.s = s;
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
            'nombre': [this.cliente.nombre, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].required],
            'personaContacto': [this.cliente.personaContacto],
            'telefono': [this.cliente.telefono, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].pattern("[0-9]{9}")],
            'telefono2': [this.cliente.telefono2, __WEBPACK_IMPORTED_MODULE_8__angular_forms__["f" /* Validators */].pattern("[0-9]{9}")],
            'email': [this.cliente.email],
            'direccion': [this.cliente.direccion],
            'poblacion': [this.cliente.poblacion],
            'cp': [this.cliente.cp],
            'provincia': [this.cliente.provincia],
            'cif': [this.cliente.cif],
            'observaciones': [this.cliente.observaciones]
        });
    }
    ClienteEditarComponent.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_6__model_settings__["a" /* Settings */].inicializa(tmp);
            if (_this.settings.versionPro != true) {
                _this.versionPro = false;
            }
            else {
                _this.versionPro = _this.settings.versionPro;
            }
        });
    };
    ClienteEditarComponent.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_6__model_settings__["a" /* Settings */].inicializa(tmp);
            if (_this.settings.versionPro != true) {
                _this.versionPro = false;
            }
            else {
                _this.versionPro = _this.settings.versionPro;
            }
        });
    };
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/clientes/cliente-editar.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Crear cliente</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n\n\n\n\n    <form [formGroup]="myForm" (ngSubmit)="onSubmit()">\n        <ion-input hidden formControlName="id"></ion-input>\n        <div *ngIf="versionPro == true; then thenBlock else elseBlock"></div>\n        <ng-template #thenBlock text-center>\n                <ion-item>\n                        \n                            <ion-label floating>Nombre</ion-label>\n                            <ion-input formControlName="nombre"></ion-input>\n                        \n                </ion-item>\n       \n     \n        <ion-item>\n            \n                <ion-label floating>Persona de contacto</ion-label>\n                <ion-input formControlName="personaContacto"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n\n                <ion-label floating>Telefono</ion-label>\n                <ion-input formControlName="telefono"></ion-input>\n\n        </ion-item>\n         <ion-item>\n\n                <ion-label floating>Telefono 2</ion-label>\n                <ion-input formControlName="telefono2"></ion-input>\n\n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Email</ion-label>\n                <ion-input formControlName="email"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Dirección</ion-label>\n                <ion-input formControlName="direccion"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Población</ion-label>\n                <ion-input formControlName="poblacion"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n                \n                    <ion-label floating>CP</ion-label>\n                    <ion-input formControlName="cp"></ion-input>\n                \n            </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Provincia</ion-label>\n                <ion-input formControlName="provincia"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>CIF/NIE</ion-label>\n                <ion-input formControlName="cif"></ion-input>\n            \n        </ion-item>\n        <ion-item>\n            \n                <ion-label floating>Observaciones</ion-label>\n                <ion-input formControlName="observaciones"></ion-input>\n            \n        </ion-item>     \n        </ng-template>\n\n        <ng-template #elseBlock>\n                <ion-item>\n                        \n                            <ion-label floating>Nombre</ion-label>\n                            <ion-input formControlName="nombre"></ion-input>\n                        \n                </ion-item>\n                <ion-input hidden formControlName="personaContacto"></ion-input>\n                <ion-item>\n                        \n                                        <ion-label floating>Telefono</ion-label>\n                                        <ion-input formControlName="telefono"></ion-input>\n                        \n                                </ion-item>\n                <ion-input hidden formControlName="telefono2"></ion-input>\n                <ion-input hidden formControlName="email"></ion-input>\n                <ion-input hidden formControlName="direccion"></ion-input>\n                <ion-input hidden formControlName="poblacion"></ion-input>\n                <ion-input hidden formControlName="cp"></ion-input>\n                <ion-input hidden formControlName="provincia"></ion-input>\n                <ion-input hidden formControlName="cif"></ion-input>\n                <ion-input hidden formControlName="observaciones"></ion-input>\n        </ng-template>\n        \n        <ion-row>\n            <ion-col>\n                <button ion-button full type="submit">Guardar</button>\n            </ion-col>\n            <ion-col>\n                <input type="button" ion-button full color="danger" (click)="cancelar()" value="Cancelar">\n            </ion-col>\n            <ion-col>\n                <span ion-button full icon-only (click)="llama()">\n                <ion-icon color="secondary" name="call" ></ion-icon>\n            </span>\n            </ion-col>\n        </ion-row>\n    </form>\n</ion-content>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/clientes/cliente-editar.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_3__service_cliente_service__["a" /* ClienteService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_8__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_7__service_settings_service__["a" /* SettingsService */],
        __WEBPACK_IMPORTED_MODULE_3__service_cliente_service__["a" /* ClienteService */],
        __WEBPACK_IMPORTED_MODULE_5__service_varios_service__["a" /* VariosService */]])
], ClienteEditarComponent);

//# sourceMappingURL=cliente-editar.component.js.map

/***/ }),

/***/ 140:
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
        console.log("cliente.inicializa");
        console.log(values);
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

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteEditarComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_parte__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_parte_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__parte_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__parte_fotos__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_angular2_signaturepad_signature_pad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__ = __webpack_require__(137);
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
            'canvasWidth': 340,
            'canvasHeight': 200,
            'penColor': "rgb(53, 93, 203)"
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
        var _this = this;
        this.firmaImg = this.signaturePad.toDataURL("image/png", 1);
        this.resizeImg(200, this.firmaImg).then(function (data) {
            _this.myForm.value.firma = data;
            _this.onSubmit();
        });
        // will be notified of szimek/signature_pad's onEnd event
        // this.firmaImg = this.signaturePad.toDataURL();
        // this.myForm.value.firma = this.firmaImg;
        // this.onSubmit();
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
    ParteEditarComponent.prototype.resizeImg = function (longSideMax, url) {
        return new Promise(function (resolve, reject) {
            var tempImg = new Image();
            tempImg.src = url;
            tempImg.onload = function () {
                // Obtiene la relacion de tamaños de la imagen
                var targetWidth = tempImg.width;
                var targetHeight = tempImg.height;
                var aspect = tempImg.width / tempImg.height;
                // Calcula el lado mas corto y guarda el "aspec ratio"
                if (tempImg.width > tempImg.height) {
                    longSideMax = Math.min(tempImg.width, longSideMax);
                    targetWidth = longSideMax;
                    targetHeight = longSideMax / aspect;
                }
                else {
                    longSideMax = Math.min(tempImg.height, longSideMax);
                    targetHeight = longSideMax;
                    targetWidth = longSideMax * aspect;
                }
                // Creo el canvas
                var canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                var ctx = canvas.getContext("2d");
                // Cojo la imagen de esquina a esquina y la dibujo
                ctx.drawImage(tempImg, 0, 0, tempImg.width, tempImg.height, 0, 0, targetWidth, targetHeight);
                console.log("Dibujada imagen de " + targetWidth + "x" + targetHeight);
                resolve(canvas.toDataURL("image/png", 1)); // Lo primero indica el tipo de archivo, lo segundo la calidad que va de 0 a 1 (Siendo 0 lo que menos)
            };
        });
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-editar.component.html"*/'<ion-header>\n    <ion-navbar>\n        <ion-title>Editar Parte de trabajo</ion-title>\n    </ion-navbar>\n</ion-header>\n<ion-content>\n    <h3 class="text-center">Parte de Trabajo para {{parte.nombre}} </h3>\n    <form class="margin-inferior" [formGroup]="myForm" (ngSubmit)="onSubmit()">\n        <ion-input hidden formControlName="id"></ion-input>\n        <ion-input hidden formControlName="clienteid"></ion-input>\n        <ion-item>\n            <ion-label floating>Fecha</ion-label>\n            <ion-datetime formControlName="fecha" displayFormat="DD/MM/YYYY"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Hora de inicio</ion-label>\n            <ion-datetime formControlName="horaini" displayFormat="HH:mm" minuteValues="00,15,30,45"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Hora de fin</ion-label>\n            <ion-datetime formControlName="horafin" displayFormat="HH:mm" minuteValues="00,15,30,45"></ion-datetime>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Trabajo realizado</ion-label>\n            <ion-textarea fz-elastic formControlName="trabajorealizado"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Autorizado por:</ion-label>\n            <ion-textarea formControlName="personafirma"></ion-textarea>\n        </ion-item>\n        <ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button full type="button" icon-left block (click)="hacerFoto()"><ion-icon name="ios-camera"></ion-icon>FOTO</button>\n                </ion-col>\n                <ion-col>\n                    <button ion-button full type="button" icon-left block  (click)="verFotos()"><ion-icon name="ios-image"></ion-icon> VER FOTOS</button>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n        <ion-item>\n            <ion-row>\n                <ion-col>\n                    <button ion-button full type="submit">Guardar</button>\n                </ion-col>\n                <ion-col>\n                    <button ion-button full type="button" color="danger" (click)="cancelar()">Cancelar</button>\n                </ion-col>\n            </ion-row>\n        </ion-item>\n        \n        <ion-row [hidden]="firmaImg!=null && firmaImg!=\'\'">\n            <ion-col>\n                <button ion-button full type="button" (click)="doOnEnd()">Aceptar firma</button>\n            </ion-col>\n            <ion-col>\n                <button ion-button full type="button" color="danger" (click)="limpiarFirma()">Borrar firma</button>\n            </ion-col>\n        </ion-row>\n        <ion-row [hidden]="(firmaImg==null || firmaImg==\'\') ">\n            <ion-col>\n                <button ion-button full type="button" color="danger" (click)="borrarFirma()">Borrar firma</button>\n            </ion-col>\n        </ion-row>\n        <ion-row [hidden]="(firmaImg==null || firmaImg==\'\') ">\n            <ion-col>\n                <img src="{{firmaImg}}" alt="firma">\n            </ion-col>\n        </ion-row>\n        <ion-item *ngIf="firmaImg==null || firmaImg==\'\'" text-wrap>Firma en el recuadro inferior y pulsa el botón "Aceptar firma".</ion-item>\n        <ion-row [hidden]="firmaImg!=null && firmaImg!=\'\'">\n            <ion-col>\n                <signature-pad (onBeginEvent)="drawStart()" [options]="signaturePadOptions"></signature-pad>\n                <!-- <canvas id="signature-pad"></canvas>        -->\n            </ion-col>\n        </ion-row>\n    </form>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-editar.component.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
        __WEBPACK_IMPORTED_MODULE_10__ionic_native_camera__["a" /* Camera */],
        __WEBPACK_IMPORTED_MODULE_9__ionic_native_keyboard__["a" /* Keyboard */],
        __WEBPACK_IMPORTED_MODULE_4__service_parte_service__["a" /* ParteService */],
        __WEBPACK_IMPORTED_MODULE_5__service_varios_service__["a" /* VariosService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */]])
], ParteEditarComponent);

//# sourceMappingURL=parte-editar.component.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 200:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	return new Promise(function(resolve, reject) { reject(new Error("Cannot find module '" + req + "'.")); });
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 200;

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_settings__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_moment_locale_es__ = __webpack_require__(57);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_6__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */]])
], EstadisticasService);

//# sourceMappingURL=estadisticas.service.js.map

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VariosService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__ = __webpack_require__(49);
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_file__["a" /* File */]])
], VariosService);

//# sourceMappingURL=varios.service.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EstadisticasProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment_locale_es__ = __webpack_require__(57);
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

/***/ 369:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__version_pro_version_pro__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__clientes_cliente_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parte_parte_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__popup_popup__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__clientes_cliente_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__settings_component_settings_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite_porter__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__estadisticas_estadisticas__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__model_settings__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_social_sharing__ = __webpack_require__(79);
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
    function HomePage(navCtrl, menu, v, platform, s, file, sqlporter, db, socialSharing, modal) {
        this.navCtrl = navCtrl;
        this.menu = menu;
        this.v = v;
        this.s = s;
        this.file = file;
        this.sqlporter = sqlporter;
        this.db = db;
        this.socialSharing = socialSharing;
        this.modal = modal;
        //inicialización de variables
        this.menu.enable(true);
        this.dia = v.getNowDate();
        this.platform = platform;
        if (this.platform.is('cordova') == false) {
            console.log("ESTOY EN EL NAVEGADOR");
        }
        else {
            console.log("ESTOY CON EL MOVIL");
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
    }
    HomePage.prototype.paginaModal = function () {
        var pModal = this.modal.create(__WEBPACK_IMPORTED_MODULE_5__popup_popup__["a" /* PopupPage */], null, { showBackdrop: false });
        pModal.present();
    };
    HomePage.prototype.createBanner = function () {
        var _this = this;
        var muestroanuncios = !this.versionPro; // Elijo si quiero anuncios o no
        console.log("¿CREO EL BANER?");
        console.log(!this.versionPro);
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
    HomePage.prototype.escChar = function (str) {
        if (typeof str == "string")
            return str.replace('/\\([\s\S])|(") / g', '\\\\$1$2');
        else
            return '';
    };
    HomePage.prototype.exportBD = function () {
        var _this = this;
        this.sqlporter.exportDbToJson(this.db.db).then(function (res) {
            var data = res.data.inserts;
            var lineas = '';
            var _loop_1 = function (item) {
                if (data[item].length > 0) {
                    var ray = data[item];
                    var cabecera_1 = '';
                    var count_1 = 0;
                    //leo cada registro de la tabla
                    ray.forEach(function (element) {
                        //leo las propiedades de cada registro para
                        //construir la linea
                        var linea = '';
                        for (var p in element) {
                            if (count_1 == 0) {
                                console.log('hago cabecera');
                                if (cabecera_1.length == 0)
                                    cabecera_1 = '\"' + p + '\"';
                                else
                                    cabecera_1 = cabecera_1 + ';' + '\"' + p + '\"';
                            }
                            if (linea.length == 0) {
                                linea = '\"' + _this.escChar(element[p]) + '\"';
                            }
                            else {
                                linea = linea + ';' + '\"' + _this.escChar(element[p]) + '\"';
                            }
                        }
                        if (count_1 == 0) {
                            lineas = lineas + '\r\n' + cabecera_1 + '\r\n' + linea + '\r\n';
                        }
                        else {
                            lineas = lineas + linea + '\r\n';
                        }
                        count_1 = count_1++;
                    });
                }
            };
            //leo las propiedades del objeto que en realidad son
            //las tablas.
            for (var item in data) {
                _loop_1(item);
            }
            if (lineas.length > 0) {
                lineas += "\r\n Las imagenes son en formato base64. Copie la columna de la imagen y peguela en https://codebeautify.org/base64-to-image-converter";
                _this.guardaCSV(lineas, 'datos' + ".csv");
            }
        }).catch(function (err) { console.log('error'); console.log(err); });
    };
    HomePage.prototype.guardaCSV = function (csv, fileName) {
        var _this = this;
        if (this.platform.is('cordova')) {
            // console.log('guardaCSV');
            // console.log(csv);
            this.file.writeFile(this.dirFiles, fileName, csv, { replace: true }).then(function (ok) {
                console.log("Fichero guardado en " + _this.dirFiles);
                console.log(ok);
                _this.socialSharing.share('fichero exportado', fileName, _this.dirFiles + fileName);
            });
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.paginaModal();
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_15__model_settings__["a" /* Settings */].inicializa(tmp);
            if (_this.settings.versionPro != true) {
                _this.versionPro = false;
            }
            else {
                _this.versionPro = _this.settings.versionPro;
            }
            if (_this.versionPro && _this.platform.is('cordova')) {
                AdMob.removeBanner();
            }
            console.log('ionViewDidLoad');
            console.log("¿ENTRO PARA CREAR EL BANNER?");
            console.log(_this.versionPro);
            if (/(ipod|iphone|ipad|android)/i.test(navigator.userAgent) && _this.versionPro == false) {
                _this.platform.ready().then(function () {
                    console.log('Platform ready');
                    console.log(_this.platform);
                    _this.createBanner();
                });
            }
        });
    };
    HomePage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_15__model_settings__["a" /* Settings */].inicializa(tmp);
            if (_this.settings.versionPro != true) {
                _this.versionPro = false;
            }
            else {
                _this.versionPro = _this.settings.versionPro;
            }
            if (_this.versionPro && _this.platform.is('cordova')) {
                AdMob.removeBanner();
            }
        });
        this.platform.ready().then(function () {
            if (_this.platform.is("ios")) {
                console.log('Directorio para ios');
                _this.dirFiles = cordova.file.tempDirectory;
            }
            if (_this.platform.is("android")) {
                console.log("Directorio para android");
                console.log(cordova);
                _this.dirFiles = cordova.file.externalDataDirectory;
            }
        });
    };
    HomePage.prototype.clientelist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__clientes_cliente_list_component__["a" /* ClienteListComponent */]);
    };
    HomePage.prototype.partelist = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__parte_parte_list_component__["a" /* ParteListComponent */]);
    };
    HomePage.prototype.clienteedit = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__clientes_cliente_editar_component__["a" /* ClienteEditarComponent */]);
    };
    HomePage.prototype.estadisticasmostrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_14__estadisticas_estadisticas__["a" /* EstadisticasPage */]);
    };
    HomePage.prototype.versionpromostrar = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__version_pro_version_pro__["a" /* VersionProPage */]);
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
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_7__settings_component_settings_component__["a" /* SettingsComponent */]);
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>\n      Partes de Trabajo\n    </ion-title>\n    <ion-buttons end>\n      <button ion-button (click)="showSettings()">\n        <ion-icon name="ios-settings"> Ajustes</ion-icon>\n      </button>\n      <!-- <span [class.online]="online==true" [class.offline]="online==false"></span> -->\n    </ion-buttons>\n  </ion-navbar> \n</ion-header>\n\n<ion-content padding class="home">\n  <h2 style="text-align:center">{{dia}}</h2>\n  \n      <button ion-button icon-left block  (click)="clientelist()">\n        <ion-icon name="contact"></ion-icon>\n        Clientes\n      </button>\n      \n      <br>\n  \n      <button ion-button icon-left block  (click)="partelist()">\n        <ion-icon name="create"> </ion-icon> \n        Partes\n      </button>\n\n      <br>\n  \n      <button ion-button icon-left block  (click)="estadisticasmostrar()">\n        <ion-icon name="stats"> </ion-icon> \n        Estadísticas\n      </button>\n\n      <br>\n\n      <button ion-button block (click)="exportBD()">\n        <ion-icon name="download">Exportar Datos a CSV</ion-icon>\n      </button>\n\n      <div *ngIf="versionPro == false; then thenBlock"></div>\n      <ng-template #thenBlock>\n        <button ion-button icon-left block  (click)="versionpromostrar()">\n          <ion-icon name="trophy"> </ion-icon> \n          Versión Pro\n        </button>\n      </ng-template>\n\n</ion-content>\n'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/home/home.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_8__service_varios_service__["a" /* VariosService */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_10__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_13__ionic_native_file__["a" /* File */],
        __WEBPACK_IMPORTED_MODULE_11__ionic_native_sqlite_porter__["a" /* SQLitePorter */], __WEBPACK_IMPORTED_MODULE_9__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_16__ionic_native_social_sharing__["a" /* SocialSharing */],
        __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["g" /* ModalController */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 370:
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

/***/ 371:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteFotosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_parte_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_photo__ = __webpack_require__(456);
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
        selector: 'page-parte-fotos',template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-fotos.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Fotos del parte nº {{parteid}}\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content padding>\n  <div class="gridfotos">\n    <div *ngFor="let f of fotos" id="{{f.id}}" class="foto">\n      <img [src]="f.base64" >\n      <p class="text-center">{{f.nombre}}</p>\n      <button ion-button color="danger" icon-left block (click)="borrarFoto(f.id)" full> <ion-icon name="trash">  </ion-icon> Eliminar</button>\n    </div>\n  </div>  \n  <ion-fab top right edge>\n    <button ion-fab mini (click)="comparte()"><ion-icon name="md-share"></ion-icon></button>\n  </ion-fab>\n</ion-content>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-fotos.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_parte_service__["a" /* ParteService */]])
], ParteFotosPage);

//# sourceMappingURL=parte-fotos.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__ = __webpack_require__(374);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the PopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var PopupPage = (function () {
    function PopupPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.imagen = "";
        this.texto = "";
    }
    PopupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PopupPage');
        this.init();
    };
    PopupPage.prototype.init = function () {
        this.http.get('http://www.goltratec.com/partesdetrabajo/noticaciones.txt', {}, {})
            .then(function (data) {
            console.log(data);
        });
    };
    return PopupPage;
}());
PopupPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-popup',template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/popup/popup.html"*/'\n<ion-content padding>\n  <div class="imagen"><img [src]="imagen"></div>\n  <div class="texto">\n    <p>{{texto}}</p>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/popup/popup.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_2__ionic_native_http__["a" /* HTTP */]])
], PopupPage);

//# sourceMappingURL=popup.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_settings__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__ = __webpack_require__(49);
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
            _this.versionPro = _this.settings.versionPro;
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
    SettingsComponent.prototype.usarioPro = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_3__model_settings__["a" /* Settings */].inicializa(tmp);
            return _this.settings.versionPro;
        });
    };
    SettingsComponent.prototype.getCamera = function () {
        var _this = this;
        var options = {
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: this.camera.DestinationType.DATA_URL,
            correctOrientation: true,
            targetWidth: 200,
            targetHeight: 140
        };
        this.camera.getPicture(options).then(function (imageData) {
            console.log('obteniendo imagen');
            console.log(imageData);
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.settings.imagen = imageData;
            _this.settings.imagenBase64 = base64Image;
            _this.s.save(_this.settings);
            _this.logo = _this.settings.imagenBase64;
            _this.v.showToast("Logo cargado", "top");
            //this.navCtrl.pop();
        }, function (err) {
            console.log("Error al capturar imagen");
            console.log(err);
        });
    };
    return SettingsComponent;
}());
SettingsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-settings-component',template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/settings-component/settings-component.html"*/'<!--\n  Generated template for the SettingsComponent page.\n\n  See http://ionicframework.com/docs/v2/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Configuración</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form (ngSubmit)="submitForm()">\n      <ion-list class="margin-list">\n        <ion-item>\n              <ion-label floating>Nombre del Técnico</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.tecnico" name="tecnico" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Serie</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.serie" name="serie" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Empresa</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.empresa" name="empresa" ></ion-input>\n        </ion-item>\n        <ion-item>\n            <ion-label floating>Direccion</ion-label>\n            <ion-input type="text" [(ngModel)]="settings.direccion" name="direccion" ></ion-input>\n      </ion-item>\n        <ion-item>\n              <ion-label floating>Localidad</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.localidad" name="localidad" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Provincia</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.provincia" name="provincia" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>CP</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.cp" name="cp" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Cif</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.cif" name="cif" ></ion-input>\n        </ion-item>\n        <ion-item>\n              <ion-label floating>Email</ion-label>\n              <ion-input type="text" [(ngModel)]="settings.email" name="email" ></ion-input>\n        </ion-item>\n       \n        <ion-item>\n              <button ion-button type="submit" name="Guardar" >Guardar</button>\n        </ion-item>\n      </ion-list>\n  </form>\n  <h2 class="text-center">Carga el logo de tu empresa</h2>\n  <ion-grid>\n      <ion-row>\n            <ion-col class="text-center">   \n                  <img *ngIf="logo!=\'\'" [src]="logo" alt="" />\n            </ion-col> \n      </ion-row>\n      <ion-row>\n            <ion-col class="text-center">\n                  <button ion-button (click)="getCamera()">Cargar Logotipo</button>\n            </ion-col>\n      </ion-row>\n      <ion-row>  \n            <ion-col class="text-center">\n                  <button ion-button (click)="removeImage()" color="danger">Eliminar Logotipo</button>\n            </ion-col>      \n      </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/settings-component/settings-component.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_4__service_varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file_transfer__["a" /* FileTransfer */], __WEBPACK_IMPORTED_MODULE_7__ionic_native_file__["a" /* File */]])
], SettingsComponent);

//# sourceMappingURL=settings-component.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(407);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_estadisticas_service__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_estadisticas_estadisticas__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__provider_estadisticas_provider__ = __webpack_require__(367);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_component__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_home_home__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_clientes_cliente_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_clientes_cliente_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_parte_parte_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_parte_parte_editar_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_parte_parte_fotos__ = __webpack_require__(371);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_popup_popup__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__service_parte_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__service_cliente_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_settings_component_settings_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_signaturepad__ = __webpack_require__(723);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_angular2_signaturepad___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_25_angular2_signaturepad__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_sqlite__ = __webpack_require__(724);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite_porter__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_elastic__ = __webpack_require__(725);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_angular2_elastic___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_angular2_elastic__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__ionic_native_screen_orientation__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__angular_platform_browser__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__angular_http__ = __webpack_require__(727);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__ = __webpack_require__(728);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__ionic_native_native_storage__ = __webpack_require__(729);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__ionic_storage__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_native_in_app_purchase_2__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_in_app_purchase__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_http__ = __webpack_require__(374);
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
            __WEBPACK_IMPORTED_MODULE_24__pages_settings_component_settings_component__["a" /* SettingsComponent */],
            __WEBPACK_IMPORTED_MODULE_8__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */],
            __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__["a" /* VersionProPage */],
            __WEBPACK_IMPORTED_MODULE_19__pages_popup_popup__["a" /* PopupPage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_31__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_32__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_12__app_component__["a" /* MyApp */], {
                backButtonText: "Atras",
            }), __WEBPACK_IMPORTED_MODULE_25_angular2_signaturepad__["SignaturePadModule"], __WEBPACK_IMPORTED_MODULE_29_angular2_elastic__["ElasticModule"]
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
            __WEBPACK_IMPORTED_MODULE_19__pages_popup_popup__["a" /* PopupPage */],
            __WEBPACK_IMPORTED_MODULE_24__pages_settings_component_settings_component__["a" /* SettingsComponent */]
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_20__service_varios_service__["a" /* VariosService */],
            __WEBPACK_IMPORTED_MODULE_22__service_cliente_service__["a" /* ClienteService */],
            __WEBPACK_IMPORTED_MODULE_21__service_parte_service__["a" /* ParteService */],
            __WEBPACK_IMPORTED_MODULE_7__service_estadisticas_service__["a" /* EstadisticasService */],
            __WEBPACK_IMPORTED_MODULE_30__ionic_native_screen_orientation__["a" /* ScreenOrientation */],
            __WEBPACK_IMPORTED_MODULE_9__provider_estadisticas_provider__["a" /* EstadisticasProvider */],
            __WEBPACK_IMPORTED_MODULE_26__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["a" /* FileTransfer */],
            __WEBPACK_IMPORTED_MODULE_36__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_28__provider_database_provider__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_23__service_settings_service__["a" /* SettingsService */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_file_transfer__["b" /* FileTransferObject */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_native_social_sharing__["a" /* SocialSharing */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_email_composer__["a" /* EmailComposer */],
            __WEBPACK_IMPORTED_MODULE_33__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_37__ionic_native_in_app_purchase_2__["a" /* InAppPurchase2 */],
            __WEBPACK_IMPORTED_MODULE_38__ionic_native_in_app_purchase__["a" /* InAppPurchase */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_keyboard__["a" /* Keyboard */],
            __WEBPACK_IMPORTED_MODULE_34__ionic_native_native_storage__["a" /* NativeStorage */],
            __WEBPACK_IMPORTED_MODULE_35__ionic_storage__["a" /* IonicStorageModule */],
            __WEBPACK_IMPORTED_MODULE_27__ionic_native_sqlite_porter__["a" /* SQLitePorter */], __WEBPACK_IMPORTED_MODULE_39__ionic_native_http__["a" /* HTTP */],
            { provide: __WEBPACK_IMPORTED_MODULE_10__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_11_ionic_angular__["c" /* IonicErrorHandler */] }]
    }),
    __metadata("design:paramtypes", [])
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(244);
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

/***/ 454:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 249,
	"./af.js": 249,
	"./ar": 250,
	"./ar-dz": 251,
	"./ar-dz.js": 251,
	"./ar-kw": 252,
	"./ar-kw.js": 252,
	"./ar-ly": 253,
	"./ar-ly.js": 253,
	"./ar-ma": 254,
	"./ar-ma.js": 254,
	"./ar-sa": 255,
	"./ar-sa.js": 255,
	"./ar-tn": 256,
	"./ar-tn.js": 256,
	"./ar.js": 250,
	"./az": 257,
	"./az.js": 257,
	"./be": 258,
	"./be.js": 258,
	"./bg": 259,
	"./bg.js": 259,
	"./bm": 260,
	"./bm.js": 260,
	"./bn": 261,
	"./bn.js": 261,
	"./bo": 262,
	"./bo.js": 262,
	"./br": 263,
	"./br.js": 263,
	"./bs": 264,
	"./bs.js": 264,
	"./ca": 265,
	"./ca.js": 265,
	"./cs": 266,
	"./cs.js": 266,
	"./cv": 267,
	"./cv.js": 267,
	"./cy": 268,
	"./cy.js": 268,
	"./da": 269,
	"./da.js": 269,
	"./de": 270,
	"./de-at": 271,
	"./de-at.js": 271,
	"./de-ch": 272,
	"./de-ch.js": 272,
	"./de.js": 270,
	"./dv": 273,
	"./dv.js": 273,
	"./el": 274,
	"./el.js": 274,
	"./en-au": 275,
	"./en-au.js": 275,
	"./en-ca": 276,
	"./en-ca.js": 276,
	"./en-gb": 277,
	"./en-gb.js": 277,
	"./en-ie": 278,
	"./en-ie.js": 278,
	"./en-nz": 279,
	"./en-nz.js": 279,
	"./eo": 280,
	"./eo.js": 280,
	"./es": 57,
	"./es-do": 281,
	"./es-do.js": 281,
	"./es-us": 282,
	"./es-us.js": 282,
	"./es.js": 57,
	"./et": 283,
	"./et.js": 283,
	"./eu": 284,
	"./eu.js": 284,
	"./fa": 285,
	"./fa.js": 285,
	"./fi": 286,
	"./fi.js": 286,
	"./fo": 287,
	"./fo.js": 287,
	"./fr": 288,
	"./fr-ca": 289,
	"./fr-ca.js": 289,
	"./fr-ch": 290,
	"./fr-ch.js": 290,
	"./fr.js": 288,
	"./fy": 291,
	"./fy.js": 291,
	"./gd": 292,
	"./gd.js": 292,
	"./gl": 293,
	"./gl.js": 293,
	"./gom-latn": 294,
	"./gom-latn.js": 294,
	"./gu": 295,
	"./gu.js": 295,
	"./he": 296,
	"./he.js": 296,
	"./hi": 297,
	"./hi.js": 297,
	"./hr": 298,
	"./hr.js": 298,
	"./hu": 299,
	"./hu.js": 299,
	"./hy-am": 300,
	"./hy-am.js": 300,
	"./id": 301,
	"./id.js": 301,
	"./is": 302,
	"./is.js": 302,
	"./it": 303,
	"./it.js": 303,
	"./ja": 304,
	"./ja.js": 304,
	"./jv": 305,
	"./jv.js": 305,
	"./ka": 306,
	"./ka.js": 306,
	"./kk": 307,
	"./kk.js": 307,
	"./km": 308,
	"./km.js": 308,
	"./kn": 309,
	"./kn.js": 309,
	"./ko": 310,
	"./ko.js": 310,
	"./ky": 311,
	"./ky.js": 311,
	"./lb": 312,
	"./lb.js": 312,
	"./lo": 313,
	"./lo.js": 313,
	"./lt": 314,
	"./lt.js": 314,
	"./lv": 315,
	"./lv.js": 315,
	"./me": 316,
	"./me.js": 316,
	"./mi": 317,
	"./mi.js": 317,
	"./mk": 318,
	"./mk.js": 318,
	"./ml": 319,
	"./ml.js": 319,
	"./mr": 320,
	"./mr.js": 320,
	"./ms": 321,
	"./ms-my": 322,
	"./ms-my.js": 322,
	"./ms.js": 321,
	"./mt": 323,
	"./mt.js": 323,
	"./my": 324,
	"./my.js": 324,
	"./nb": 325,
	"./nb.js": 325,
	"./ne": 326,
	"./ne.js": 326,
	"./nl": 327,
	"./nl-be": 328,
	"./nl-be.js": 328,
	"./nl.js": 327,
	"./nn": 329,
	"./nn.js": 329,
	"./pa-in": 330,
	"./pa-in.js": 330,
	"./pl": 331,
	"./pl.js": 331,
	"./pt": 332,
	"./pt-br": 333,
	"./pt-br.js": 333,
	"./pt.js": 332,
	"./ro": 334,
	"./ro.js": 334,
	"./ru": 335,
	"./ru.js": 335,
	"./sd": 336,
	"./sd.js": 336,
	"./se": 337,
	"./se.js": 337,
	"./si": 338,
	"./si.js": 338,
	"./sk": 339,
	"./sk.js": 339,
	"./sl": 340,
	"./sl.js": 340,
	"./sq": 341,
	"./sq.js": 341,
	"./sr": 342,
	"./sr-cyrl": 343,
	"./sr-cyrl.js": 343,
	"./sr.js": 342,
	"./ss": 344,
	"./ss.js": 344,
	"./sv": 345,
	"./sv.js": 345,
	"./sw": 346,
	"./sw.js": 346,
	"./ta": 347,
	"./ta.js": 347,
	"./te": 348,
	"./te.js": 348,
	"./tet": 349,
	"./tet.js": 349,
	"./th": 350,
	"./th.js": 350,
	"./tl-ph": 351,
	"./tl-ph.js": 351,
	"./tlh": 352,
	"./tlh.js": 352,
	"./tr": 353,
	"./tr.js": 353,
	"./tzl": 354,
	"./tzl.js": 354,
	"./tzm": 355,
	"./tzm-latn": 356,
	"./tzm-latn.js": 356,
	"./tzm.js": 355,
	"./uk": 357,
	"./uk.js": 357,
	"./ur": 358,
	"./ur.js": 358,
	"./uz": 359,
	"./uz-latn": 360,
	"./uz-latn.js": 360,
	"./uz.js": 359,
	"./vi": 361,
	"./vi.js": 361,
	"./x-pseudo": 362,
	"./x-pseudo.js": 362,
	"./yo": 363,
	"./yo.js": 363,
	"./zh-cn": 364,
	"./zh-cn.js": 364,
	"./zh-hk": 365,
	"./zh-hk.js": 365,
	"./zh-tw": 366,
	"./zh-tw.js": 366
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
webpackContext.id = 454;

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_estadisticas_estadisticas__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(369);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_clientes_cliente_list_component__ = __webpack_require__(80);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_parte_parte_list_component__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase_2__ = __webpack_require__(400);
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
                title: "Estadísticas",
                component: __WEBPACK_IMPORTED_MODULE_1__pages_estadisticas_estadisticas__["a" /* EstadisticasPage */]
            },
            {
                title: "Versión pro",
                component: __WEBPACK_IMPORTED_MODULE_0__pages_version_pro_version_pro__["a" /* VersionProPage */]
            },
        ];
        platform.ready().then(function () {
            console.log(platform.platforms());
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            //inicializa la bd creando el fichero de bd pero no la estructura.
            _this.db.dbname = "partes1";
            _this.db.init();
            var sqlcrearfotos;
            var camposCliente;
            camposCliente = ["id", "nombre", "personaContacto", "telefono", "telefono2", "email", "direccion", "poblacion", "cp", "provincia", "cif", "observaciones"];
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
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Nav */]),
    __metadata("design:type", __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["h" /* Nav */])
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<ion-nav id="nav" #content [root]="rootPage"></ion-nav>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_8__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_9__ionic_native_in_app_purchase_2__["a" /* InAppPurchase2 */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 456:
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

/***/ 46:
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

/***/ 80:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cliente_editar_component__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__parte_parte_editar_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_cliente__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_cliente_service__ = __webpack_require__(81);
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
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/clientes/cliente-list.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Clientes</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n\n  <ion-row>\n    <ion-col>\n      <button ion-button full (click)=\'crearCliente()\'>Añadir cliente</button>\n    </ion-col>\n  </ion-row>\n\n  <ion-row *ngFor="let cliente of clientes">\n \n    <ion-col>\n\n        <ion-row>\n            <ion-col>\n            <p style="line-height: 30px">\n              <strong>{{cliente.id}} - {{cliente.nombre}}</strong>\n            </p>\n          </ion-col>\n          <ion-col>\n              <button ion-button color="dark" *ngIf="cliente.telefono.length>0" (click)="llamar(cliente.telefono);" style="float:right">\n                  <ion-icon color="secondary" name="call" ></ion-icon>\n               </button>\n          </ion-col>\n        </ion-row>\n     \n\n      <ion-row>\n        <ion-col>\n          <button full ion-button outline icon-left block  (click)="crearParte(cliente.id,cliente.nombre)">\n              <ion-icon name="md-document" ></ion-icon>\n                Crear Parte\n            </button>\n        </ion-col>\n\n        \n        </ion-row>\n\n \n        <ion-row>\n        <ion-col>\n          <button full ion-button icon-left block color="default" (click)="cargaCliente(cliente)">\n              <ion-icon name="arrow-dropright" ></ion-icon>\n                Editar\n            </button>\n        </ion-col>\n\n        <ion-col>\n            <button full ion-button icon-left block color="danger" (click)="borrarCliente(cliente.id)">\n                <ion-icon name="trash" ></ion-icon>\n                  Eliminar\n              </button>\n          </ion-col>\n      </ion-row>\n\n\n    </ion-col>\n  </ion-row>\n\n\n\n</ion-content>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/clientes/cliente-list.html"*/,
        providers: [__WEBPACK_IMPORTED_MODULE_5__service_cliente_service__["a" /* ClienteService */]],
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */],
        __WEBPACK_IMPORTED_MODULE_5__service_cliente_service__["a" /* ClienteService */],
        __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
        __WEBPACK_IMPORTED_MODULE_6__service_varios_service__["a" /* VariosService */]])
], ClienteListComponent);

//# sourceMappingURL=cliente-list.component.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClienteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
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
            sql = 'INSERT INTO cliente (nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__provider_database_provider__["a" /* DatabaseProvider */]])
], ClienteService);

//# sourceMappingURL=cliente.service.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_settings__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__provider_database_provider__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_cliente__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__cliente_service__ = __webpack_require__(81);
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
    function ParteService(_varios, _db, loadingCtrl, clienteService, platform, s, emailComposer, socialSharing, file) {
        this._varios = _varios;
        this.loadingCtrl = loadingCtrl;
        this.clienteService = clienteService;
        this.platform = platform;
        this.s = s;
        this.emailComposer = emailComposer;
        this.socialSharing = socialSharing;
        this.file = file;
        this.cliente = new __WEBPACK_IMPORTED_MODULE_9__model_cliente__["a" /* Cliente */]();
        this.db = _db;
        this.dirFiles = "";
        console.log("constructor ParteService");
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
    ParteService.prototype.obtenerDatosCliente = function (clienteid) {
        var sql;
        sql = 'SELECT * FROM cliente WHERE id=?';
        return this.db.query(sql, [clienteid]);
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
    ParteService.prototype.generarPdf = function (parte) {
        var _this = this;
        console.log("Entro a generar el PDF");
        var loader = this.loadingCtrl.create({
            content: "Cargando",
            duration: 3000
        });
        loader.present();
        // let cliente: Cliente;
        console.log("CARGO DATOS DEL CLIENTE PARA GENERAR EL PARTE");
        this.obtenerDatosCliente(parte.clienteid).then(function (data) {
            if (data.rows.length > 0) {
                for (var i_1 = 0; i_1 < data.rows.length; i_1++) {
                    _this.cliente = data.rows.item(0);
                    console.log(_this.cliente);
                }
                var descripcionShare = void 0;
                var asuntoShare = void 0;
                var nombrePdf = void 0;
                var numParte = void 0;
                if (_this.settings.serie != undefined) {
                    numParte = _this.settings.serie + parte.id;
                }
                else {
                    numParte = parte.id.toString();
                }
                // AQUÍ DEBERÍA IR EL NUMERO DE PARTE, PERO MIENTRAS Y PARA PRUEBAS ESTOY PONIENDO LA ID //
                var alturaExtra = 0;
                if (parte.firma != '') {
                    alturaExtra = 30;
                }
                descripcionShare = "Hola," + '\n' + "Adjunto envío el parte de trabajo Nº " + numParte + '\n' + "Un cordial saludo.";
                asuntoShare = "Parte de trabajo Nº " + numParte;
                nombrePdf = "parte_" + parte.id + ".pdf";
                var partepdf = new jsPDF();
                var numPaginas = 1; // Variable para almacenar el numero de páginas total del documento inizalizada a 1
                var lineaActual = 0;
                // CABECERA //
                console.log("Generando cabecera...");
                partepdf.setFontSize(10);
                partepdf.setFontType('bold');
                partepdf.text(110, 15, "Parte de trabajo Nº " + numParte);
                partepdf.setLineWidth(0.3); // Defino grosor de linea horizontal
                partepdf.line(75, 18, 200, 18); // Linea horizontal
                partepdf.text(75, 25, "Cliente");
                partepdf.text(75, 30, "Dirección");
                partepdf.text(75, 35, "Localidad");
                partepdf.text(75, 40, "Provincia");
                partepdf.text(75, 45, "C.I.F./N.I.F.");
                partepdf.text(75, 50, "Teléfono");
                partepdf.setFontType('normal');
                partepdf.text(110, 25, _this.cliente.nombre);
                if (_this.cliente.direccion != null) {
                    partepdf.text(110, 30, _this.cliente.direccion);
                }
                if (_this.cliente.poblacion != null) {
                    partepdf.text(110, 35, _this.cliente.poblacion);
                }
                if (_this.cliente.provincia != null) {
                    partepdf.text(110, 40, _this.cliente.provincia);
                }
                if (_this.cliente.cif != null) {
                    partepdf.text(110, 45, _this.cliente.cif);
                }
                partepdf.text(110, 50, _this.cliente.telefono);
                // LOGO EMPRESA //
                console.log("Generando logo en cabecera (si lo hay)...");
                if (_this.settings.imagenBase64 != '' && _this.settings.imagenBase64 != null && _this.settings.imagenBase64 != undefined) {
                    //partepdf.addImage(this.settings.imagenBase64, 'PNG', 15, 18, 50, 35);
                    partepdf.addImage(_this.settings.imagenBase64, 'PNG', 15, 18);
                }
                else {
                    console.log("No hay logo");
                }
                // FIN LOGO EMPRESA //
                console.log("Cabecera generada");
                // FIN CABECERA //
                //ACTUACION//
                console.log("Generando área de actuacion...");
                partepdf.text("ACTUACIÓN", 105, 60, 'center');
                partepdf.line(10, 63, 200, 63); // Linea horizontal
                partepdf.setFontType('bold');
                partepdf.text(20, 70, "Fecha:");
                partepdf.text(20, 78, "Hora de inicio:");
                partepdf.text(110, 78, "Hora de fin:");
                partepdf.text(110, 70, "Trabajador:");
                partepdf.text(20, 93, "Trabajo realizado:");
                partepdf.setFontType('normal');
                partepdf.text(50, 70, parte.fechaformato);
                partepdf.text(50, 78, parte.horainiformato + "h.");
                partepdf.text(140, 78, parte.horafinformato + "h.");
                if (_this.settings.tecnico != undefined && _this.settings.tecnico != null) {
                    partepdf.text(140, 70, _this.settings.tecnico);
                }
                var splitNotas = partepdf.splitTextToSize(parte.trabajorealizado, 170);
                partepdf.text(splitNotas, 20, 100);
                console.log("Área de actuación generada");
                //FIN ACTUACION//
                var lineasTrabajoSol = parte.trabajorealizado.length / 95;
                var alturaTrabajoSol = lineasTrabajoSol * 5;
                lineaActual = 100 + alturaTrabajoSol;
                console.log("LINEA ACTUAL -> " + lineaActual);
                // FOOTER //
                console.log("Generando footer...");
                for (var i = 1; i <= +partepdf.internal.getNumberOfPages(); i++) {
                    console.log("Cambio a la pagina -> " + i);
                    partepdf.setPage(i);
                    if (_this.settings.empresa != undefined && _this.settings.cif != undefined && _this.settings.direccion != undefined && _this.settings.cp != undefined && _this.settings.localidad != undefined && _this.settings.provincia != undefined) {
                        partepdf.text(_this.settings.empresa + " - " + _this.settings.cif + " - " + _this.settings.direccion, 105, 265, 'center');
                        partepdf.text(_this.settings.cp + " - " + _this.settings.localidad + " (" + _this.settings.provincia + ")", 105, 270, 'center');
                    }
                    partepdf.text("Página " + i + " de " + partepdf.internal.getNumberOfPages(), 105, 285, 'center');
                    // Firma verde //
                    var imgMundoVerde = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAA5+GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA4LTA4VDA5OjM5OjI3KzAyOjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMDgtMDhUMDk6NDA6MzYrMDI6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA4LTA4VDA5OjQwOjM2KzAyOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjMzZGQ1NWE5LTRjZjUtNDUwYy04ODE5LTUzMTBkMGUwMDFkNDwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ1NWQ1MWE1LWJjOWItMTE3YS1hZDQyLWIxMTc5YjE0NTBiNjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmFjYTY2MTYxLTIzYzUtNGI0YS04Mzk4LWFjYWU0MjRmMzZjMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDphY2E2NjE2MS0yM2M1LTRiNGEtODM5OC1hY2FlNDI0ZjM2YzM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDgtMDhUMDk6Mzk6MjcrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjMzZGQ1NWE5LTRjZjUtNDUwYy04ODE5LTUzMTBkMGUwMDFkNDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wOC0wOFQwOTo0MDozNiswMjowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NTA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pm8DGPUAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOgAAFIIAAEVWAAAOpcAABdv11ofkAAAEO1JREFUeNrcmntwXFd9xz/n3Oe+JK20smxJ1sNy4odkJ46dB5DHJCY1LqQ8S1MyZUoZaNoyDC1T2jIwQMtA22k7LbTQMIEOheGVkPDoNJQkOHEcB8c2NrHj2IllPSzZsl6r1Uq7e1/n9I+7kleyndhJp+1w7pzdvffu3Xu/5/f6/n6/FVprfhWG+NAXutj/5CDJ9Gv7oSgCxzHZeuNmurpbM0KKd5TmyymtmQEuuVoabYIuadSjWqtZhYofDEGofSJCBALxCvc3/6dWxDAgDMPep3b94taB/rPWht5Ot2VV7oNexe+JogghxMVAVF81aH4BfBh4urrGV3b/bTvqOTNYwHZfM5YdwGOGwdvGzsztPNU/Ml8pFT/X0dV2jdJ6Ra1MagHEIDQavQp4H+i9oE/F31No1GVJRJqmgWEKtHrNIP4DSALU1YNh8Lbnj5z9q+HBkU9m6tLDWi88tjo/dXWePyZA/VihrlaEVRCLoxlouySQtu4cLe0p/MqrBtENfLNWTbUGxwE3wZZ9Tz+/c3hg5O8SKQelo/NyqAJbVK3zZxzQ9+saEQp4v4aHAfdlJRKFESp6daYB/ATILT+hVGw358ajDzy9Z3+pVJn9gTTEBVJQF33Xt2it3qHRHSAe0uj7NepFhepXXHwzo0izsqOJ/OQIWoO4Mhv7InB17YFSOfZRjm2ScG1u2NKBYdj3ulHbT0Nn6q4oDA0tltlIdSoArdBoBOK+eKF0VqNCjfj0y3otIQQt7VmOHRy5Qj/BXcAfLOx4Hvg+tK9cTWtbju6utaTqLZAepmluk8LcND3vC0VU9UgXqlasTYvHcjXnvwF6+GWBBEFIKpOguTXN2aE5UplYx19hpIAvCgGRgrk5WNWcY9uWG+le246RqFCqTCNliNYa0xL4nudYpkslmF0CJA7IC2AW5HJ+r/rp717pgWQURtiOSc/GVgB877LU68NC0FnxIPDh5utv5u6730WyKeTZ5x9lunCOSlkxk59ndHScZ/cdZWqyQCpRh2naRDq8CIhLGv8u0MeoUcGLTWP73a2EfkhdYxKvPE9+ooLWsaFeYvQKwffLFTANi3e96V6MhObg8UfxgwqFmRJRoDkzdo6h4WGyDVmiUHH4uV+Sy+ZozjVTLE0hEJd4cFUjLQU6+iOt9Umt430huOg0F7TSrwRsuWUdTSvHeO6ZYbyyRmuYq0C0VNXsMGSkOWu03nX7PXI0/wL7ju5CKEinC4AmCCK6u7poXdXKilyOrk6LdCZJQ10TSasOy3DwwzJCymVARAxEg5CCICr/LIyCR3Q1yEkpsXCxTPsC9V9CUbyyT9uaHNmWNCefO0NxxueG1q0IZO3XDvmBuXpr77Y9Rwb3vuHZo7upS1kIIQkCH0Ma3PL6N7Bxwwby+Rm+8a1v0pht5rabb8WwYWx6kEB5IC8mEQVao3SEH5S5Y+O9P2lMrcEL5mPDTGX49kNf4LFnfk624WWAaA2+F5JIufTetBqlIv70LQ/j0niBev3t19+7Yc+h3TTVmwhhABrTNInCkD179wIwPDLCxGSBs+MFMk2SVasbKBQLWKYVXyNq6EqNvRi2ZHp0iqET039y59v/7GHg5MKNn6p7iqGh3RjL4p5xx92tF1A5FSlUBPniGUrlWXrbdyxRrUf23v/EF7772dXNDRaGNJeQWyklM4UCIyMjHHl+gN4NPezceSuYAZ4XUpfOxmuvQ0LlEUYB0gDLMUEowjBAmHD65DT/tevJdO/azb0dqzb8O4Dnl/j6D/+GmeJpUikwzPPzZdmvFCZnCy8sOTaRH/njL33vo+uSDhiGwfJ8RgiBbVmMjRe5dvNV3LXzrSTcFLmZTrRQJFyHilcmjDzCKCSIKhTn80xOTzE9k6exuQEbm46Wqxl66Tn++bsf2X7jpjfvtEznkV3PfpdH9z7N2g4IL0cii0tvppmaG2B46hc0ZTppSLa6X/vRX3zrZ/v3ZJqz9iXykoj5+ZBbb76Rt9/1TizLoeJVSKUyJN0kUhg4VgLHTpN0MmTrmuk/OcyTuw6wtvNqtvbdhC5bpJJJsg0uI+MvkbFXrd2w5vqvfu6+e5gqTOLaryIfybjN7D35LYTUvOemL+08Mfxka8IEpTSGIdFaE4YhSsd0e76s6F3fw443/jpoCIMIx3ZjH6k1UhooHYHSRCqESNHW2sZNN11HIuGy+6k99PR0k8vlaGrKsrK1nnOVfTeOTtyxcWZ25nnbYjvw+AWk7+UksuBJssmViXOzL+bO5o/+vZn2O9MZSX5qHqUVURRi2w7JRIIgCOjbsIHfeuc9SGkQhQrTtDAMc3EKKWMvKASGYeC6CR5/4qccP3GcUwP9DA6PUS4XSSQSnBoYoFAokmupY8++R1cdOnLg3QmXzwvBYeDEEpX+7MNba9wfaFQKuEqjr9JarwV9DehrNXpVGHl1tmuRsus5tGeI4eExOjpbuOPWN9LU1MT0dJ5EIsXqtg4qXoBpWpiGiRAyzhC1RmmNUmEc7AQcPXaYH/z4IaIownFshBB4vo9pGERRhNYawzK5Yf2bODVwlKEzgzgO/VWyqmpVqw34Q2AN0C4Q7UBn1W6rPC6Ow6a0iXyNb5Ro625icHCMrVu20buxj8mpSVZ3dGFgUvEqWKaLYZiYZhxjpJBVeh8RKYFt2xw+cpAHHnoAw5QkEu6i43BsmyiKsCwLEEwXPKQhSSbrFoJzTzUt/sdaIEogLY3+DQnJOE9YoHXVzLkKSBLzljDQuBnIrUgyODjExMQEuaYWrtm0hSAKSKcySGGgiT2blBaGkGg0URS/m4ZJnMuDY5kXeD+jhiM5FkQqJAi9Wob+58DXgFkACZwFPiagHbhXIA8JYj2+YIpYt1UkEKbitu03smFdLzOzBXbtfpLh00OsaG7B82Lm2dLcSipZh2mYmJaNadoYhokUBlKaTE9P4vnn6wwLqnSBIZswV86TSTYgz5OMFuD3LmbsFeCgQB4QiA+ymPKLxW3xsxDxDWVIR0sPN2x5HalUgrm5OYIw4DsPfoPTo8MMDQ/gOi5XdW4kVCE6ir2bUjExTKZSDAwdZ/RMkSiMsCyB54UIsVQiSkdkUg24RoazE0O1hHYt8BUgMu64uxWBgRTGglF+ErheUFuUWfoqACkMvKBMFIYkrSwtK1bS2dHFgUPP8vTPj5KfOcPhIy8ydu4UgfJpb+3ANC3CMCCMQvzAI9vQSFO2kYo3y9o1XVx7zXWkUi5zc3P4vo+sLr/nR6xdvYliscC5yTHM80GjEXgK6Dfu/O3OGEC8ZQXcjxBuXIe6UBrUHJFCUvKLJJ16GtJN5AvT7DuwF8+bxXVsUkmDsfE8Bw4dYnNvH6vbOglVQBB6BIFPpVKivr6Bazdfy/qrNrCieQXdXZ2Mnhnl7Ngkth0/ccWPWLu6j+npMSbzU1hLo58NPGgKliQet4NqqC1fgOTCWpFA6wiBRKuQicIwHSt7OH7iGP39p8lkrMWCXF3GwfcDvv3gv/HEU4+RyzXx+htvjR29jgi9EKVCojBiem4M17ZJJlOLNF0IUBq00ljGRdnEG4CEuaz0dV1cGKnNvgAhz+9X82ohYrKoZERhfoJz08OsXNFKJmMRBCGO45x3p47N6JkRXjw5QqUCYRiy/fYd+EEFFUVoBCW/yMjEcTpWrKNvYx8DgwMUi0UMQ9BUn0ZiMDVzFnNZwicl7eUS2+Uyz9QjkMjqvqw5J2s8l9KKlF3PyvoeGtNtmNKmf/QIHV3t3H7br1Gc03i+tygVrTWu61CXMWhrTdHZ0UUY+ASBj9IKrRQjE8epBHNEoSKZdKnPpFFK4QUR7St6MKTN0JlJbKuWoEJxFrrXtkTLJZLQNVpVG08Wj+k4MLpWCsOwaHJaqU80kZ8f59zkCH0b+ijOFjj03EHCIEDWuJjZ2Yir1tbRubqT+fkiYRRiCJOxmX6miqM4VhrDMJiYGGdiagrLMvCjiKSTZXDoOFrFNYWFEQQUDVN8tW/z1c+bQizJ/p4V8NaFeuwCBFFb5VAelpkEDLyggtYK23JZ1dhDqEPCyGfHnW9ibr7IgUO/JJM2FqWSydi0ta1G6QjPL2MIg2J5itOTLyClgRCCIAiozzSQTmY4NTjBqhVZtq1785EHT39+rLXNRQoRAFOeJwbb2nNnNm7uWp9KpVeay6reXxFx6G+pFcWCZMIoINewumwbblSYm0q7dopIhfhBhUhFmJaN71cozOZRNaVLz/epy2R49zvfTktzCzOFabTWKKUYmTqOH5ZxzCRaKyaLozimS9faFmRC0NO6Ubd0Oo+8bnvvQaWUNoSRA5HVWq53HPsjhpRPlEuV/eayys8kiN8ViEfiCoA+z4i1xrFt8lMzf93o9tzmuMU7/KCCEIlFhRVhLL0gCLBMazFwqSpBaqivR6PxfQ/LdDib72d67iyW6S5GqXmvwHwlT3NrhtbOBoIgFE8e//LHElY9prQX1VxKCPyAQPMhIdBScMH2E4H4bGzkxqKhSylJptL7Dh7cP/y9Bx64PmN1YloQBBWiKCKKAsIwiAsQBti2RRRCEAT4AfRt7ENKwXypCBoK8+Oczb+ElHJJ08CQJqZh43sh5VJI4Ae4Zh0CiVIKrTRaaZTSaK0/BwxXg4Rg6QTgM8Cx2vBnWw4z03Pfnxqf3zFVnMk8vXsf2UQXwoxi1YrCOGoHAZ7v4boOlhkvwDWb17GpbxN+UInBhh5n8ycJVYAhrEsmdbH7Fiyz4xrt0f+0UAy/VIYYAvcAhxb8lWmYo8eP9J8rzam31NfBvsP7EcLk5tu3MOsN43klLNNFa0WpVCSbbcBxJNuu28rWrdsolUr4vo9lOEzMDTFbmcQynFfXL4xhflrD+GI8eZnvHwY+WrO/ayY/u0Zr0lJCJg0/P/wMjz2yGzNYQSZTR6Qr+IFHEAQoHREpKHsVKpUSlUoZNMyWx5ksDWFI44rbazVjCM1Xa+O2fIUL/gHYm0i6DA6MnJgcL61LJGLPLCXUpeHIiaM8/PAPOdNfIe224LgGlWCOTF2Svr51vPjSSc6Nj6GJCEKvmoNIXuP4RJWtX1Ez9D2GYTxXKVfKlUrU7rgs4UHpNEwVpvjxf/6I7s5u1q9fx6r2RiQhmzf1omSRfHEMRT2RUtUqoMBwTF5lZ3yPhm8ubxSblyVG+ITWZBZ6hMtHMhF3qPoHBxgZHaY5l6OxqZPrr9t08j07PnWsf+Tg+iD0HY3GtdLFXF33C4dHf9idnz+9zTISV2QZwKcv1u2+rPZ0uVS5r7O7bevAydF1U1PF6xxnuXeJpZNKxTn5uclzHDx6Dn9eD3zwrvvf2lZ/bXJ06oQVKV+0ZjfNd664Ltg//B0iHZ6y4h7kZQ79NRCPX7SYeDmXh2HoZ+rSz6TS9sejkM8Dj1XrsRe0UKUE2yZc08HEL1/cP/iZf/lNiuWpkiYqeMH8TMnLB5EOFhz7ey8TwePA7wDvX9IVrpmXJREhBGEQEoZqVAg+Xj1cB2Qv0Wn1gXI6ycRPn36QW17/RhqzOcrebFykFtWasWAPgk9V49bC+FfgWDVhOgX6JRBHX+kZX8s/H2YXKhiXDmjQ2JDBthzUQo9DSCrhHJEKFtoVfwncCdxcverLIJ670od5zX7wSkfSzvLU8fsYn+3HNlNVMOJ9GoKqOTe8Gmf2vwpE6ZCEXR/rXliq5VgngQ9UP7uLTZ//r0ASVgMDE/s4Nb6PjLtiOcf7uoafASsXurtKh5fxL5T/AyBJO8vAxLO8OLabjNt8Ae8Gfh84uFjgQBFq/7KkI35V/nj23wMAk1lu6IIpUUkAAAAASUVORK5CYII=';
                    partepdf.addImage(imgMundoVerde, 'PNG', 15, 278, 8, 8);
                    partepdf.setTextColor(45, 90, 45);
                    partepdf.setFontSize(7);
                    partepdf.text("Cuidemos del medio ambiente.", 25, 282);
                    partepdf.text("Por favor, no imprima este parte si no es necesario.", 25, 285);
                    partepdf.setTextColor(0, 0, 0);
                    partepdf.setFontSize(12);
                    // Fin firma verde //
                }
                if (parte.firma != '' && parte.firma != null) {
                    partepdf.addImage(parte.firma, 'PNG', 20, 225, 51, 30);
                    partepdf.text("Fdo. " + parte.personafirma, 20, 255);
                }
                else {
                    console.log("No hay firma de cliente");
                }
                console.log("Footer generado con éxito");
                // FIN FOOTER //
                console.log("Guardo el contenido del pdf (blob) en una variable");
                var pdfOutput = partepdf.output('blob');
                console.log('Creo el pdf');
                if (_this.platform.is('cordova')) {
                    _this.file.writeFile(_this.dirFiles, nombrePdf, pdfOutput, { replace: true }).then(function (ok) {
                        loader.dismiss();
                        console.log("Fichero guardado en " + _this.dirFiles);
                        console.log(ok);
                    });
                    // You are on a device, cordova plugins are accessible
                    _this.socialSharing.share(descripcionShare, asuntoShare, _this.dirFiles + nombrePdf);
                }
                else {
                    loader.dismiss();
                    // Cordova not accessible, add mock data if necessary
                    //window.open(this.dirFiles + nombrePdf);
                    //partepdf.output("dataurlnewwindow");
                    partepdf.save(nombrePdf);
                }
            }
        }).catch(function (error) {
            console.log(error);
            loader.dismiss();
            console.log('error cargando datos de cliente');
        });
    };
    ParteService.prototype.enviaPorEmail = function (parte) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Cargando",
            duration: 3000
        });
        loader.present();
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
                        loader.dismiss();
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
                            loader.dismiss();
                            console.log("error enviando mensaje ");
                            _this._varios.showToast("Se produjo un error al enviar el Email", "top");
                            console.log(error);
                        });
                    }, function (err) {
                        loader.dismiss();
                        console.log("error al guardar el fichero");
                        console.log(err);
                    });
                }
                else {
                    loader.dismiss();
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
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_7__provider_database_provider__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_10__cliente_service__["a" /* ClienteService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_4__settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_email_composer__["a" /* EmailComposer */], __WEBPACK_IMPORTED_MODULE_8__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_file__["a" /* File */]])
], ParteService);

//# sourceMappingURL=parte.service.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParteListComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_parte_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_varios_service__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__parte_editar_component__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_parte__ = __webpack_require__(370);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_settings__ = __webpack_require__(46);
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
    function ParteListComponent(navCtrl, parteService, varios, s, alertCtrl) {
        this.navCtrl = navCtrl;
        this.parteService = parteService;
        this.varios = varios;
        this.s = s;
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
    ParteListComponent.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_7__model_settings__["a" /* Settings */].inicializa(tmp);
            _this.versionPro = _this.settings.versionPro;
        });
    };
    ParteListComponent.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad parte-list component');
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_7__model_settings__["a" /* Settings */].inicializa(tmp);
            _this.versionPro = _this.settings.versionPro;
        });
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
        console.log('Envía parte');
        if (this.versionPro) {
            this.parteService.generarPdf(parte);
        }
        else {
            this.parteService.enviaPorEmail(parte);
        }
    };
    return ParteListComponent;
}());
ParteListComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-list.component.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name=\'menu\'></ion-icon>\n    </button>\n    <ion-title>Partes</ion-title>\n  </ion-navbar>\n</ion-header>\n<ion-content>\n\n  <h3 class="text-center">Listado de partes de trabajo</h3>\n\n  <ion-row *ngFor="let p of partes" class="transparente">\n    <ion-col>\n      <button class="" ion-item icon-left (click)="cargaParte(p)">  \n        <ion-icon class="verde" *ngIf="p.firmaBase64!=\'\'" name="checkmark-circle-outline"></ion-icon>\n        {{p.id}} - {{p.nombre}} - {{p.fechaformato}} - {{p.horainiformato}}\n      </button>\n      <ion-row>\n        <ion-col>\n          <button full ion-button icon-left block color="danger" (click)="eliminaParte(p.id)">\n            <ion-icon name="trash"></ion-icon>\n               Eliminar\n          </button>\n        </ion-col>\n        <ion-col>\n          <button full ion-button icon-left block (click)="enviarEmail(p)">\n            <ion-icon name="mail"> </ion-icon>\n              Enviar\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-col>\n  </ion-row>\n\n</ion-content>'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/parte/parte-list.component.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__service_parte_service__["a" /* ParteService */],
        __WEBPACK_IMPORTED_MODULE_3__service_varios_service__["a" /* VariosService */], __WEBPACK_IMPORTED_MODULE_6__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], ParteListComponent);

//# sourceMappingURL=parte-list.component.js.map

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VersionProPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__ = __webpack_require__(240);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_settings_service__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_settings__ = __webpack_require__(46);
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
    function VersionProPage(navCtrl, navParams, iap, plt, s, loadingCtrl, alertCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.iap = iap;
        this.plt = plt;
        this.s = s;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.productos = [];
        this.comprasAnteriores = [];
        this.textoVersionPro = "Actualizar a Versión Premium.";
        this.soypro = "VERSIÓN PRO ACTIVADA";
        var loader = this.loadingCtrl.create({
            content: "Cargando",
            duration: 3000
        });
        loader.present();
        this.plt.ready().then(function () {
            _this.iap.getProducts([ID_COMPRA_PRO])
                .then(function (productos) {
                _this.productos = productos;
                loader.dismiss();
            })
                .catch(function (err) {
                console.log(err);
                loader.dismiss();
                if (_this.plt.is('ios')) {
                    _this.textoVersionPro = "No se ha podido establecer la conexión con AppStore";
                }
                else if (_this.plt.is('android')) {
                    _this.textoVersionPro = "No se ha podido establecer la conexión con Play Store";
                }
                else if (_this.plt.is('windows')) {
                    _this.textoVersionPro = "No se ha podido establecer la conexión con Windows Store";
                }
                else {
                    _this.textoVersionPro = "No se ha podido establecer la conexión con la tienda";
                }
            });
        });
    }
    VersionProPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        this.s.getData().then(function (data) {
            var tmp = JSON.parse(data);
            _this.settings = __WEBPACK_IMPORTED_MODULE_4__model_settings__["a" /* Settings */].inicializa(tmp);
            _this.versionPro = _this.settings.versionPro;
        });
    };
    VersionProPage.prototype.comprar = function (producto) {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Cargando"
        });
        loader.present();
        this.iap.buy(producto).then(function (data) {
            loader.dismiss();
            _this.activaProducto(producto);
        })
            .catch(function (err) {
            console.log(err);
            loader.dismiss();
            if (_this.plt.is('ios')) {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Fallo en la compra',
                    subTitle: 'Lamentamos informar que no ha sido posible conectar con la AppStore, por favor, revise su conexión o pruebe más tarde',
                    buttons: ['Aceptar']
                });
                alert_1.present();
            }
            else if (_this.plt.is('android')) {
                var alert_2 = _this.alertCtrl.create({
                    title: 'Fallo en la compra',
                    subTitle: 'Lamentamos informar que no ha sido posible conectar con Play Store, por favor, revise su conexión o pruebe más tarde',
                    buttons: ['Aceptar']
                });
                alert_2.present();
            }
            else if (_this.plt.is('windows')) {
                var alert_3 = _this.alertCtrl.create({
                    title: 'Fallo en la compra',
                    subTitle: 'Lamentamos informar que no ha sido posible conectar con Windows Store, por favor, revise su conexión o pruebe más tarde',
                    buttons: ['Aceptar']
                });
                alert_3.present();
            }
            else {
                var alert_4 = _this.alertCtrl.create({
                    title: 'Fallo en la compra',
                    subTitle: 'Lamentamos informar que no ha sido posible conectar con la tienda, por favor, revise su conexión o pruebe más tarde',
                    buttons: ['Aceptar']
                });
                alert_4.present();
            }
        });
    };
    VersionProPage.prototype.restaurar = function () {
        var _this = this;
        var loader = this.loadingCtrl.create({
            content: "Cargando"
        });
        loader.present();
        if (this.plt.is('ios') == false && this.plt.is('android') == false && this.plt.is('windows') == false && this.plt.is('cordova') == false) {
            if (this.versionPro == false) {
                console.log("ACTIVO PRODUCTO EN NAVEGADOR PARA DEBUG");
                this.activaProducto(ID_COMPRA_PRO);
            }
            else {
                console.log("DESACTIVO PRODUCTO EN NAVEGADOR PARA DEBUG");
                this.desactivaProducto(ID_COMPRA_PRO);
            }
        }
        else {
            this.iap.restorePurchases().then(function (compras) {
                loader.dismiss();
                _this.comprasAnteriores = compras;
                // Unlock the features of the purchases!
                for (var _i = 0, _a = _this.comprasAnteriores; _i < _a.length; _i++) {
                    var anteriores = _a[_i];
                    _this.activaProducto(anteriores.productId);
                }
            })
                .catch(function (err) {
                console.log(err);
                loader.dismiss();
                if (_this.plt.is('ios')) {
                    var alert_5 = _this.alertCtrl.create({
                        title: 'Fallo en la restauración',
                        subTitle: 'Lamentamos informar que no ha sido posible conectar con la AppStore, por favor, revise su conexión o pruebe más tarde',
                        buttons: ['Aceptar']
                    });
                    alert_5.present();
                }
                else if (_this.plt.is('android')) {
                    var alert_6 = _this.alertCtrl.create({
                        title: 'Fallo en la restauración',
                        subTitle: 'Lamentamos informar que no ha sido posible conectar con Play Store, por favor, revise su conexión o pruebe más tarde',
                        buttons: ['Aceptar']
                    });
                    alert_6.present();
                }
                else if (_this.plt.is('windows')) {
                    var alert_7 = _this.alertCtrl.create({
                        title: 'Fallo en la restauración',
                        subTitle: 'Lamentamos informar que no ha sido posible conectar con Windows Store, por favor, revise su conexión o pruebe más tarde',
                        buttons: ['Aceptar']
                    });
                    alert_7.present();
                }
                else {
                    var alert_8 = _this.alertCtrl.create({
                        title: 'Fallo en la restauración',
                        subTitle: 'Lamentamos informar que no ha sido posible conectar con la tienda, por favor, revise su conexión o pruebe más tarde',
                        buttons: ['Aceptar']
                    });
                    alert_8.present();
                }
            });
        }
    };
    VersionProPage.prototype.activaProducto = function (id) {
        // Normally store these settings/purchases inside your app or server!
        if (id === ID_COMPRA_PRO) {
            this.versionPro = true;
            this.settings.versionPro = this.versionPro;
            this.s.save(this.settings);
        }
    };
    VersionProPage.prototype.desactivaProducto = function (id) {
        // Normally store these settings/purchases inside your app or server!
        if (id === ID_COMPRA_PRO) {
            this.versionPro = false;
            this.settings.versionPro = this.versionPro;
            this.s.save(this.settings);
        }
    };
    VersionProPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VersionProPage');
    };
    return VersionProPage;
}());
VersionProPage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'page-version-pro',template:/*ion-inline-start:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/version-pro/version-pro.html"*/'<!--\n  Generated template for the VersionProPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  \n    <ion-navbar>\n       <button ion-button menuToggle>\n        <ion-icon name=\'menu\'></ion-icon>\n      </button>\n      <ion-title>VERSIÓN PRO</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n\n<ion-content padding>\n  <ion-row text-center>\n    <div *ngIf="versionPro == true; then thenBlock else elseBlock"></div>\n    <ng-template #thenBlock>\n        <ion-col>{{soypro}}</ion-col>\n    </ng-template>\n    <ng-template #elseBlock>\n        <ion-col>{{textoVersionPro}}</ion-col>\n    </ng-template>\n  </ion-row>\n \n  <ion-card *ngFor="let producto of productos">\n    <ion-card-header text-center>{{ producto.title }}</ion-card-header>\n    <ion-card-content text-center>\n      {{ producto.description }}\n    </ion-card-content>\n    <ion-row text-center>\n      <ion-col>\n          <div *ngIf="versionPro == true; then thenBlock else elseBlock"></div>\n          <ng-template #thenBlock text-center>\n              <button ion-button round disabled="true">\n                  Comprado\n                </button>\n          </ng-template>\n          <ng-template #elseBlock text-center>\n              <button ion-button round (click)="comprar(producto.productId)">\n                  Comprar ahora - {{ producto.price }}\n                </button>\n          </ng-template>\n      </ion-col>\n    </ion-row>\n  </ion-card>\n \n  <button ion-button full icon-left color="secondary" (click)="restaurar()">\n  <ion-icon name="refresh"></ion-icon>Restaurar compras\n</button>\n \n  <ion-card *ngFor="let anterior of comprasAnteriores">\n    <ion-card-header text-center>Versión Pro comprada</ion-card-header>\n    <ion-card-content text-center>\n      ¡Muchas gracias por su compra! :-)\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/Users/franciscogarcia/Documents/angular2/ionic2partes/src/pages/version-pro/version-pro.html"*/,
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_in_app_purchase__["a" /* InAppPurchase */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__service_settings_service__["a" /* SettingsService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
], VersionProPage);

//# sourceMappingURL=version-pro.js.map

/***/ })

},[402]);
//# sourceMappingURL=main.js.map