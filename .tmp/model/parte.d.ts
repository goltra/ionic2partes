export declare class Parte {
    id: number;
    clienteid: number;
    fecha: string;
    horaini: string;
    horafin: string;
    trabajorealizado: string;
    personafirma: string;
    firma: string;
    nombre: string;
    constructor();
    /** Getter para devolver la fecha en un formato legible y no en formato ISO
     * como se guarda en la base de datos.
     */
    readonly fechaformato: string;
    readonly horainiformato: string;
    readonly horafinformato: string;
    /**Devuelve la firma en base64 (formato concreto que pide el plugin de cordova)
     * para poder insertarla en el email.
     * */
    readonly firmaBase64: string;
    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    static inicializa(values: Object): Parte;
}
