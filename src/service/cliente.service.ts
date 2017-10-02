import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import { DatabaseProvider } from '../provider/database.provider';

@Injectable()

export class ClienteService{
    private db: DatabaseProvider;


    constructor(private platform:Platform,_db:DatabaseProvider){
       this.db = _db;
       console.log(this.db);
    }


    listaClientes(){
         let sql = 'Select * from cliente';
         console.log(this.db);
         return this.db.query(sql);
         //return this.db.executeSql(sql,[]);
        // return this.storage.query(sql);

    }

    borrarCliente(id:number){
         let sql: string;
         sql = 'delete from cliente where id=?'
         return this.db.query(sql,[id]);
        // return this.storage.query(sql,[id]);
    }

    actualizaCliente(id:number=null, nombre: string, personaContacto: string, telefono:string,  telefono2: string, email: string, direccion: string, poblacion: string, cp: string, provincia: string, cif: string, observaciones: string) {
        let sql: string;
        if(id==null){
            sql = 'INSERT INTO cliente (nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
            return this.db.query(sql,[nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones]);
            //return this.storage.query(sql,[nombre,telefono]);
        }else{
            sql = "Update cliente set nombre=?,personaContacto=?, telefono=?, telefono2=?, email=?, direccion=?, poblacion=?, cp=?, provincia=?, cif=?, observaciones=? where id=?"
            return this.db.query(sql,[nombre, personaContacto, telefono, telefono2, email, direccion, poblacion, cp, provincia, cif, observaciones, id]);
        }
    }


}
