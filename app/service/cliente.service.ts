import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Cliente} from '../model/cliente';

@Injectable()

export class ClienteService{
    private storage:any;
    constructor(){
        this.storage=new Storage(SqlStorage);
        this.storage.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT)');

    }
    listaClientes(){
        let sql = 'Select * from cliente';
        return this.storage.query(sql);
    }
    creaCliente(nombre: string, telefono:string) {
        let sql = 'INSERT INTO cliente (nombre, telefono) VALUES (\'' + nombre + '\',\'' + telefono + '\')';
        return this.storage.query(sql);

    }
}
