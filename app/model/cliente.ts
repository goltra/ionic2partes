export class Cliente{
    public id: number;
    public nombre: string;
    public telefono: string;
    constructor(private _nombre:string, private _telefono:string){
        this.nombre=this._nombre;
        this.telefono=this._telefono;

    }
    
}