import {Injectable} from '@angular/core';
import { SQLite } from 'ionic-native';
import {Parte} from '../model/parte';
import {VariosService} from './varios.service';
import {EmailComposer} from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';

@Injectable()

export class ParteService{
    private storage:any;
    private db;
    constructor(private _varios: VariosService, _db:DatabaseProvider){
        
        this.db = _db
        
        this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
                    (data)=>{

                    },
                    (error)=>{console.log("Error al crear la tabla parte: " + error.err.message)}
                );
      
    }

    listaPartes(){
        let sql:string;
        sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id';
        return this.db.query(sql);
    }
    elimina(parteid:number){
         let sql: string;
         sql = 'delete from parte where id=?'
         return this.db.query(sql,[parteid]);

    }
    cargarParte(id){
        let sql:string;
        sql = 'Select parte.*, cliente.* from parte inner join cliente on clienteid=cliente.id where parte.id=?';
        return this.db.query(sql,[id]).then(
            (data)=>{
                console.log("cargando parte con id " + id);
            },
            (error)=>{
                console.log("error al cargar el parte con el id " + id  + " - " + error.err.message);
            }
        ); 
    }
    actualizaParte(f){
        let sql: string;

        if(f.id==null){
            sql="insert into parte values (?,?,?,?,?,?,?,?)";
        } else {
            sql="update parte set id=?,clienteid=?,fecha=?,horaini=?,horafin=?,trabajorealizado=?,personafirma=?,firma=? where id=" + f.id;
        }
        this.db.query(sql,[f.id,f.clienteid, f.fecha,f.horaini,f.horafin,f.trabajorealizado,f.personafirma,f.firma]).then(
            (data)=>{
                this._varios.showToast("Parte guardado correctamente","top");
                console.log("Insertado parte ");
            },
            (error)=>{console.log("error al insertar parte "+ error.err.message);}
        );
    }
    enviaPorEmail(parte:Parte){
        let msg:String;

        msg = "<h1><strong>Parte de Trabajo número:</strong> " + parte.id +"</h1>";
        msg+="<h2><strong>Cliente: </strong>" + parte.nombre + '</h2>';
        msg+="<p><strong>Fecha:</strong> " + parte.fechaformato + '</p>';
        msg+="<p><strong>Horas:</strong> " + parte.horainiformato + ' a ' + parte.horafinformato + '</p>';
        msg+="<p>" + parte.trabajorealizado + '</p>';
        msg+="<hr>";
        msg+="<p><strong>Firmado: </strong>" +  parte.personafirma + "</p>";

        console.log(msg);
        EmailComposer.isAvailable().then(
            (available)=>{
                console.log("envio de email disponible");
                EmailComposer.open({
                    to:      '',
                    subject: 'Parte de trabajo nº ' + parte.id,
                    body:    <any>msg,
                    attachments: <any>parte.firmaBase64,
                    isHtml: true
                }).then(
                    (sended)=>{
                        console.log("email enviado ");
                        this._varios.showToast("Email enviado","top");
                    },
                    (error)=>{
                        console.log("error enviando mensaje ");
                        this._varios.showToast("Se producjo un error al enviar el Email o","top");
                        console.log(error);
                    }
                );
            },
            (error)=>{
                console.log("no disponible");
            }
        );


  }
   
}
