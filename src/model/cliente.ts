export class Cliente{
    public id: number;
    public nombre: string;
    public personaContacto: string;
    public telefono: string;
    public telefono2: string;
    public email: string;
    public direccion: string;
    public poblacion: string;
    public cp: string;
    public provincia: string;
    public cif: string;
    public observaciones: string;
    
    
    constructor(){
      this.nombre="";
      this.personaContacto="";
      this.telefono="";
      this.telefono2="";
      this.email="";
      this.direccion="";
      this.poblacion="";
      this.cp="";
      this.provincia="";
      this.cif="";
      this.observaciones="";
      
      
    }
    /**Funcion estatica que inicializa un objecto de tipo parte en base a los
     * valores de un objeto pasado.
     */
    static inicializa(values:Object) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            let cliente = new Cliente();
            // console.log("parte inicializado a null")
            for(let p in values){
                if(Object.getOwnPropertyDescriptor(values, p)!=undefined ){
                   cliente[p] = values[p];
                }
            }
            // console.log("parte despues del for")
            // console.log(parte);
            return cliente;
        } catch (error) {
            alert ("Cliente.inicializa " + error);
        }
    }
}
