import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Cliente} from '../model/cliente';
import { SQLite } from 'ionic-native';
import {Platform} from 'ionic-angular';
import { DatabaseProvider } from '../provider/database.provider';

@Injectable()

export class ClienteService{
    private db: DatabaseProvider;


    constructor(private platform:Platform,_db:DatabaseProvider){
       this.db = _db;
       console.log(this.db);

        // this.db.openDatabase({
        // name: 'data.db',
        // location: 'default' // the location field is required
        // }).then(() => {
        // this.db.executeSql('create table danceMoves(name VARCHAR(32))', {}).then(() => {

        // }, (err) => {
        // console.error('Unable to execute sql: ', err);
        // });
        // }, (err) => {
        // console.error('Unable to open database: ', err);
        // });
        this.db.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT);').then(
                    (data)=>{
                        console.log("Crear tabla cliente")
                    },
                    (error)=>{console.log("Error al crear la tabla cliente: " + error.err.message)}
                );


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

    actualizaCliente(id:number=null, nombre: string, telefono:string) {
        let sql: string;
        if(id==null){
            sql = 'INSERT INTO cliente (nombre, telefono) VALUES (?,?)';
            return this.db.query(sql,[nombre,telefono]);
            //return this.storage.query(sql,[nombre,telefono]);
        }else{
            sql = "Update cliente set nombre=?,telefono=? where id=?"
            return this.db.query(sql,[nombre,telefono,id]);
        }
    }


}
