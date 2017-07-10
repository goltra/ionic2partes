import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../provider/database.provider';

declare var window: any;

@Injectable()
export class EstadisticasProvider {
	
	private db: DatabaseProvider;

	constructor(private _db: DatabaseProvider) {
		
		this.db = _db;

	 }
	
	numeropartes(): Promise<any> {
		console.log("Obtencion de numero total de partes actuales");
		return new Promise((resolve) => {
			let sql: string;
   		    sql = 'Select count(parte.id) as n from parte';

			this.db.query(sql).then(
				(data) => {
					if(data.rows.length>0){
       		   	    console.log('Data row -> '+data.rows);
        			console.log('cargando partes');
					let nump: number = data.rows.item(0).n;
       		    	console.log('Encontrados '+nump+' partes');
					resolve(nump);
					} else{
						resolve(0);	
					}
				}
			).catch(error => {
		  console.log("ERROR No se ha creado la base de datos!!");
          //console.log(error);
          resolve(0);
        });
		});
	}

}