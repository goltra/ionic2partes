export class Photo{
    base64: string="";
    nombre: string="";
    id: number;
    parteid: number;

    static inicializa(values:Object) {
        // console.log("parte.inicializa");
        // console.log(values);
        try {
            let parte= new Photo();
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
            alert ("Photo.inicializa " + error);
        }
    }
}