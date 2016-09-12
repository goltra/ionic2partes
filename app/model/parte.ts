export class Parte{
    public id: number;
    public clienteid: number;
    public fecha: string;
    public horaini: string;
    public horafin: string;
    public trabajorealizado: string;
    public personafirma: string;
    public firma: string;

    constructor(_id:number, _clienteid:number, _fecha:string){
        this.id=_id;
        this.clienteid=_clienteid;
        this.fecha=_fecha;
    }
    
   
}