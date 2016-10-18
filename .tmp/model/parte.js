export var Parte = (function () {
    function Parte() {
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
