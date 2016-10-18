import { Injectable } from '@angular/core';
export var DatabaseProvider = (function () {
    function DatabaseProvider() {
        this.dbname = 'YourDBName.db';
    }
    /**
     * Init - init database etc. PS! Have to wait for Platform.ready
     */
    DatabaseProvider.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (typeof window.sqlitePlugin !== 'undefined') {
                _this.db = window.sqlitePlugin.openDatabase({ name: _this.dbname, location: 'default' });
                console.log("--> running on device: ", _this.db);
            }
            else {
                _this.db = window.openDatabase(_this.dbname, '1.0', 'Test DB', -1);
                console.log("--> running in browser: ", _this.db);
            }
            ;
        });
    };
    /**
     * query - executes sql
     */
    DatabaseProvider.prototype.query = function (q, params) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            params = params || [];
            _this.db.transaction(function (tx) {
                tx.executeSql(q, params, function (tx, res) {
                    resolve(res);
                }, function (tx, err) {
                    reject(err);
                });
            });
        });
    };
    DatabaseProvider.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    DatabaseProvider.ctorParameters = [];
    return DatabaseProvider;
}());
