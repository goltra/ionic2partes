import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Cliente} from '../model/cliente';

@Injectable()

export class ClienteService{
    private storage:any;
    constructor(){
        this.storage=new Storage(SqlStorage);
        let sql: string;
        
        this.storage.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT);').then(
                    (data)=>{
                        console.log(data.res);
                    },
                    (error)=>{console.log("Error al crear la tabla cliente: " + error.err.message)}
                );

       
    }

    listaClientes(){
        let sql = 'Select * from cliente';
        return this.storage.query(sql);

    }
    //TODO: funcion para eliminar cliente
    borrarCliente(id:number){
        let sql: string;
        sql = 'delete from cliente where id=?'
        return this.storage.query(sql,[id]);
    }
  
    actualizaCliente(id:number=null, nombre: string, telefono:string) {
        let sql: string;
        if(id==null){
            sql = 'INSERT INTO cliente (nombre, telefono) VALUES (?,?)';
            return this.storage.query(sql,[nombre,telefono]);
        }else{
            sql = "Update cliente set nombre=?,telefono=? where id=?"
            return this.storage.query(sql,[nombre,telefono,id]);
        }
    }

   
}
