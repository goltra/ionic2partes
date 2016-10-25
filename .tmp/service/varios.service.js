import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
export var VariosService = (function () {
    function VariosService(toastCtrl) {
        this.toastCtrl = toastCtrl;
    }
    VariosService.prototype.showToast = function (mensaje, posicion) {
        var toast = this.toastCtrl.create({
            message: mensaje,
            position: posicion,
            cssClass: 'toastError',
            duration: 2000
        });
        toast.present();
    };
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
    /**DE MOMENTON O SE USA PERO LA DEJO POR SI ACASO
     * Funcion que devuelve la hora actual con el formato parsado en el
       * pattenr. Por defecto es HH:mm 21:00
        * return string
        */
    /**   getNowTime(pattern='HH:mm'): string{
           let now=new Date();
           let hora= new DatePipe();
           let horastr = hora.transform(now,pattern);
    
           return horastr;
       }
        */
    VariosService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    VariosService.ctorParameters = [
        { type: ToastController, },
    ];
    return VariosService;
}());
