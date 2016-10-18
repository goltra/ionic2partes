export declare class Cliente {
    id: number;
    nombre: string;
    telefono: string;
    constructor();
    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    static inicializa(values: Object): Cliente;
}
