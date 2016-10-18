export var Cliente = (function () {
    function Cliente() {
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
            // console.log(parte);
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
