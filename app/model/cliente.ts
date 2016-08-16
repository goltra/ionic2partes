export class Cliente{
    public id: number;
    public nombre: string;
    public telefono: string;
    constructor(_id:number, _nombre:string, _telefono:string){
        this.id=_id;
        this.nombre=_nombre;
        this.telefono=_telefono;
    }
    
}