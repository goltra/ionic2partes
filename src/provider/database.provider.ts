import { Injectable } from '@angular/core';

declare var window: any;

@Injectable()
export class DatabaseProvider {

	public db: any;
	public dbname: string = 'YourDBName.db';

	constructor() { }
	/**
	 * Init - init database etc. PS! Have to wait for Platform.ready
	 */

	init(): Promise<any> {
		console.log("Init DatabaseProvider, a cotinuación tipo de dispositivo.");
		return new Promise(resolve => {
			if (typeof window.sqlitePlugin !== 'undefined') {
				this.db = window.sqlitePlugin.openDatabase({ name: this.dbname, location: 'default' });
				 console.log("--> running on device: ", this.db);
			} else {
				this.db = window.openDatabase(this.dbname, '1.0', 'Test DB', -1);
				 console.log("--> running in browser: ", this.db);
			};
		});
	}

	/**
	 * query - executes sql
	 */
	query(q: string, params?: any): Promise<any> {
		console.log("DatabaseProvider: ejecutando query()");
		return new Promise((resolve, reject) => {
			params = params || [];
			this.db.transaction((tx) => {
				tx.executeSql(q, params, (tx, res) => {
					resolve(res);
				}, (tx, err) => {
					reject(err);
				});
			});
		});
	}
}
