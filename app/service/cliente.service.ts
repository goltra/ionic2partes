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
    //TODO: funcion para eliminar cliente

    //TODO: unificar modificar/crear para qeu la logica esté en el servicio y no desde
    //el front
    modificarCliente(cliente: Cliente){
        let sql = "Update cliente set nombre=?,telefono=? where id=?"
        this.storage.query(sql,[cliente.nombre,cliente.telefono,cliente.id]).then(
                        (data)=>{
                            console.log("modificarCliente(): " + data.res);
                        },
                        (error)=>{console.log(error)}
                    );
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

    /**Comprueba con el id recibido si el cliente existe y devuelve el numero de clientes con ese id 
     * Devuelve promise de la consulta con el atributo numclientes
     * 0 = > no existe el cliente
     * 1 = > existe el cliente
    **/
    existeCliente(id: number){
        let sql = "Select count(*) as numclientes from cliente where id=?";
        let numclientes: number;
        
        return this.storage.query(sql,[id]);
    }   
}
