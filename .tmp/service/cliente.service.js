import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { DatabaseProvider } from '../provider/database.provider';
export var ClienteService = (function () {
    function ClienteService(platform, _db) {
        this.platform = platform;
        this.db = _db;
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
        this.db.query('CREATE TABLE IF NOT EXISTS cliente (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, telefono TEXT);').then(function (data) {
            console.log("Crear tabla cliente");
        }, function (error) { console.log("Error al crear la tabla cliente: " + error.err.message); });
    }
    ClienteService.prototype.listaClientes = function () {
        var sql = 'Select * from cliente';
        return this.db.query(sql);
        //return this.db.executeSql(sql,[]);
        // return this.storage.query(sql);
    };
    ClienteService.prototype.borrarCliente = function (id) {
        var sql;
        sql = 'delete from cliente where id=?';
        return this.db.query(sql, [id]);
        // return this.storage.query(sql,[id]);
    };
    ClienteService.prototype.actualizaCliente = function (id, nombre, telefono) {
        if (id === void 0) { id = null; }
        var sql;
        if (id == null) {
            sql = 'INSERT INTO cliente (nombre, telefono) VALUES (?,?)';
            return this.db.query(sql, [nombre, telefono]);
        }
        else {
            sql = "Update cliente set nombre=?,telefono=? where id=?";
            return this.db.query(sql, [nombre, telefono, id]);
        }
    };
    ClienteService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ClienteService.ctorParameters = [
        { type: Platform, },
        { type: DatabaseProvider, },
    ];
    return ClienteService;
}());
