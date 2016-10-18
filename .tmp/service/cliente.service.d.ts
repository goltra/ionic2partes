import { Platform } from 'ionic-angular';
import { DatabaseProvider } from '../provider/database.provider';
export declare class ClienteService {
    private platform;
    private db;
    constructor(platform: Platform, _db: DatabaseProvider);
    listaClientes(): Promise<any>;
    borrarCliente(id: number): Promise<any>;
    actualizaCliente(id: number, nombre: string, telefono: string): Promise<any>;
}
