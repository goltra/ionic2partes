import { Parte } from '../model/parte';
import { VariosService } from './varios.service';
import { DatabaseProvider } from '../provider/database.provider';
export declare class ParteService {
    private _varios;
    private storage;
    private db;
    constructor(_varios: VariosService, _db: DatabaseProvider);
    listaPartes(): any;
    elimina(parteid: number): any;
    cargarParte(id: any): any;
    actualizaParte(f: any): void;
    enviaPorEmail(parte: Parte): void;
}
