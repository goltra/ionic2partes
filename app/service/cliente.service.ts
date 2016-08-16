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
    /** Devuelve un array de Cliente  */
    listaClientes(){
        let sql = 'Select * from cliente';
        let listaClientes=[];
        this.storage.query(sql).then(
            (data)=>{
                if(data.res.rows.length>0){
                    for (var i = 0; i < data.res.rows.length; i++) {
                        let item = data.res.rows[i];
                        listaClientes.push(new Cliente(item.id,item.nombre,item.telefono));
                    }
                }
            },
            (error)=>{
                alert("Error al cargar la lista de clientes");
            }
        );
        return listaClientes;
    }
    modificarCliente(cliente: Cliente){
        let sql = "Update cliente set nombre=?,telefono=? where id=?"
        this.storage.query(sql,[cliente.nombre,cliente.telefono,cliente.id]).then(
                        (data)=>{
                            console.log("modificarCliente(): " + data.res);
                        },
                        (error)=>{console.log(error)}
                    );
    }
    creaCliente(nombre: string, telefono:string) {
        let sql = 'INSERT INTO cliente (nombre, telefono) VALUES (?,?)';
        return this.storage.query(sql,[nombre,telefono]);
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
