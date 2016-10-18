import { ToastController } from 'ionic-angular';
export declare class VariosService {
    private toastCtrl;
    constructor(toastCtrl: ToastController);
    showToast(mensaje: string, posicion: string): void;
    /**Funcion que devuelve la fecha actual con el formato ISO.
     * Tras varias pruebas deduzco que el formato ISO no incluye la zona hoario por lo que siempre va a dar
     * la hora sin incrementar ni decrementar por zonas. Por ese motivo se obtiene a parte el timezoneOffset
     * y se suma a los minutos para finalmente devolver en formato ISO.
     * Se usa el formato iso porque hay componentes de formularios de ionic (ion-datatime) que lo necesitan.
     * return string
     */
    getNowDateIso(pattern?: string): string;
}
