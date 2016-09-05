import {Injectable} from '@angular/core';
import {Storage, SqlStorage} from 'ionic-angular';
import {Parte} from '../model/parte';

@Injectable()

export class ParteService{
    private storage:any;
    constructor(){
        this.storage=new Storage(SqlStorage);
        
        
        this.storage.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT);').then(
                    (data)=>{

                    },
                    (error)=>{console.log("Error al crear la tabla parte: " + error.err.message)}
                );
      
    }

    listaPartes(){
        let sql:string;
        sql = 'Select * from parte';
        return this.storage.query(sql);
    }

     actualizaParte(f){
         let sql: string;

         if(f.id==null){
             sql="insert into parte values (?,?, ?,?,?,?,?)";
         }
         this.storage.query(sql,[f.id,f.clienteid, f.fecha,f.horaini,f.horafin,f.trabajorealizado,f.personafirma]).then(
             (data)=>{
                 console.log("Insertado parte ");
             },
             (error)=>{console.log("error al insertar parte "+ error.err.message);}
         );
    }

   
}
