export class Parte{
    public id: number;
    public clienteid: number;
    public fecha: string;
    public horaini: string;
    public horafin: string;
    public trabajorealizado: string;
    public personafirma: string;
    public firma: string;
    public nombre: string;

    constructor(){
        
    }
    /** Getter para devolver la fecha en un formato legible y no en formato ISO
     * como se guarda en la base de datos.
     */
    get fechaformato():string {
         //console.log("fecha");
         let f = new Date(this.fecha);
        
         //console.log(f.toLocaleDateString());
        return f.toLocaleDateString();
    }
    get horainiformato():string{
         let hi = new Date(this.horaini);
         hi.setHours(hi.getHours(),hi.getMinutes()-(hi.getTimezoneOffset()*-1));
         return hi.toLocaleTimeString();
    }
    get horafinformato():string{
         let hf = new Date(this.horafin);
         hf.setHours(hf.getHours(),hf.getMinutes()-(hf.getTimezoneOffset()*-1));
         return hf.toLocaleTimeString();
    }

    /**Devuelve la firma en base64 (formato concreto que pide el plugin de cordova) 
     * para poder insertarla en el email. 
     * */
    get firmaBase64():string{
        if(this.firma!=null){
            return this.firma.replace("data:image/png;base64,","base64:firma.png//");
        }
        return '';
    }

    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    static inicializa(values:Object) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            let parte= new Parte();
            // console.log("parte inicializado a null")
            // console.log(parte);
            for(let p in values){
                // console.log(p);
                // console.log(Object.getOwnPropertyDescriptor(values, p));
                if(Object.getOwnPropertyDescriptor(values, p)!=undefined ){
                   parte[p] = values[p];
                }     
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return parte;
        } catch (error) {
            alert ("Parte.inicializa " + error);
        }
    }
    
    
}