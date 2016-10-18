import { Injectable } from '@angular/core';
import { VariosService } from './varios.service';
import { EmailComposer } from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';
export var ParteService = (function () {
    function ParteService(_varios, _db) {
        this._varios = _varios;
        this.db = _db;
        this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(function (data) {
        }, function (error) { console.log("Error al crear la tabla parte: " + error.err.message); });
    }
    ParteService.prototype.listaPartes = function () {
        var sql;
        sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id';
        return this.db.query(sql);
    };
    ParteService.prototype.elimina = function (parteid) {
        var sql;
        sql = 'delete from parte where id=?';
        return this.db.query(sql, [parteid]);
    };
    ParteService.prototype.cargarParte = function (id) {
        var sql;
        sql = 'Select parte.*, cliente.* from parte inner join cliente on clienteid=cliente.id where parte.id=?';
        return this.db.query(sql, [id]).then(function (data) {
            console.log("cargando parte con id " + id);
        }, function (error) {
            console.log("error al cargar el parte con el id " + id + " - " + error.err.message);
        });
    };
    ParteService.prototype.actualizaParte = function (f) {
        var _this = this;
        var sql;
        if (f.id == null) {
            sql = "insert into parte values (?,?,?,?,?,?,?,?)";
        }
        else {
            sql = "update parte set id=?,clienteid=?,fecha=?,horaini=?,horafin=?,trabajorealizado=?,personafirma=?,firma=? where id=" + f.id;
        }
        this.db.query(sql, [f.id, f.clienteid, f.fecha, f.horaini, f.horafin, f.trabajorealizado, f.personafirma, f.firma]).then(function (data) {
            _this._varios.showToast("Parte guardado correctamente", "top");
            console.log("Insertado parte ");
        }, function (error) { console.log("error al insertar parte " + error.err.message); });
    };
    ParteService.prototype.enviaPorEmail = function (parte) {
        var _this = this;
        var msg;
        msg = "<h1><strong>Parte de Trabajo número:</strong> " + parte.id + "</h1>";
        msg += "<h2><strong>Cliente: </strong>" + parte.nombre + '</h2>';
        msg += "<p><strong>Fecha:</strong> " + parte.fechaformato + '</p>';
        msg += "<p><strong>Horas:</strong> " + parte.horainiformato + ' a ' + parte.horafinformato + '</p>';
        msg += "<p>" + parte.trabajorealizado + '</p>';
        msg += "<hr>";
        msg += "<p><strong>Firmado: </strong>" + parte.personafirma + "</p>";
        console.log(msg);
        EmailComposer.isAvailable().then(function (available) {
            console.log("envio de email disponible");
            EmailComposer.open({
                to: '',
                subject: 'Parte de trabajo nº ' + parte.id,
                body: msg,
                attachments: parte.firmaBase64,
                isHtml: true
            }).then(function (sended) {
                console.log("email enviado ");
                _this._varios.showToast("Email enviado", "top");
            }, function (error) {
                console.log("error enviando mensaje ");
                _this._varios.showToast("Se producjo un error al enviar el Email o", "top");
                console.log(error);
            });
        }, function (error) {
            console.log("no disponible");
        });
    };
    ParteService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ParteService.ctorParameters = [
        { type: VariosService, },
        { type: DatabaseProvider, },
    ];
    return ParteService;
}());
