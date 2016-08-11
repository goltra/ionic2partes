import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';

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
    creaCliente() {
        let sql = 'INSERT INTO cliente (nombre, telefono) VALUES (\'pedro\',\'00000\')';
        return this.storage.query(sql);
  }
}
