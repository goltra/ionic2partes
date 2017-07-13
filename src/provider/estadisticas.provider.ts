import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../provider/database.provider';
<<<<<<< HEAD
import * as moment from 'moment';
import 'moment/locale/es';

declare let Chart;
=======

>>>>>>> 035a84ccb26e35284bf28874a6350ef574104e5d
declare var window: any;

@Injectable()
export class EstadisticasProvider {
	
	private db: DatabaseProvider;

	constructor(private _db: DatabaseProvider) {
		
		this.db = _db;

	 }
	
<<<<<<< HEAD
	numeropartesdeldia(fechadia): Promise<any> {
		console.log("Obtencion de numero de partes del dia "+fechadia);
		return new Promise((resolve) => {
			let sql: string;
   		    sql = 'Select parte.fecha as n from parte';
			
			this.db.query(sql).then(
				(data) => {
					if(data.rows.length>0){
        			//console.log('cargando partes');
					let nump: number = 0;

       				   for (let i = 0; i < data.rows.length; i++) {
								let item = data.rows.item(i).n;
								//console.log("Item -> "+item);
								 if(fechadia.isSame(this.fechatomoment(item), 'day')){
									 //console.log("LAS FECHAS COINCIDEN");	 
									nump++;
								 }
						  }

       		    	console.log('Encontrados '+nump+' partes');
					resolve(nump);
					} else{
						resolve(0);	
					}
				}
			).catch(error => {
		  console.log("ERROR No se ha creado la base de datos!!");
          resolve(0);
        });
		});
	}

	numeropartesdias(dias): Promise<any>{
		console.log("Obtencion de numero de partes de los últimos "+dias+ "días.");
		return new Promise((resolve) => {
			let sql: string;
   		    sql = 'Select parte.fecha as n from parte';
			
			this.db.query(sql).then(
				(data) => {
					if(data.rows.length>0){
        			console.log('cargando partes');
					let nump: number = 0;

       				   for (let i = 0; i < data.rows.length; i++) {
								let item = data.rows.item(i).n;
								console.log("Item -> "+item);
								 if(this.entrefechas(this.fechatomoment(item), dias)){
									nump++;
								 }
						  }

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

	fechatomoment(fecha){
		//console.log("Fecha -> "+fecha);
		let f = new Date(fecha);
		//console.log("F -> "+f);
		let fechastr = f.toLocaleDateString();
		//console.log("Fechastr -> "+fechastr);
		let fechamoment = moment(f);
		//console.log("Moment -> "+fechamoment);
		let momento = fechamoment.format("YYYY-MM-DD HH:mm:ss");
		//console.log("Momento -> "+momento);
		return fechamoment;
	  }

	  momenttofecha(fecha){
		//console.log("Moment -> "+fecha);
		let f = new Date(fecha);
		//console.log("Fecha -> "+f);
		return f;
	  }
	
	entrefechas(fecha, dias){ // Ver si la "fecha" esta entre los ultimos "dias" dias
		let hoy = moment(); // Fecha actual
		let diasantes = moment().subtract(dias, 'days'); // Fecha hace "dias" dias.
		return fecha.isBetween(diasantes, hoy); // Si la fecha esta entre hoy y hace "dias" dias devuelvo true, si no, false
	}
	
	numeropartes(): Promise<any> {
		console.log("Obtencion de numero total de partes actuales");
		let now = moment().format('LLLL');
		console.log("Hora actual -> "+now);
=======
	numeropartes(): Promise<any> {
		console.log("Obtencion de numero total de partes actuales");
>>>>>>> 035a84ccb26e35284bf28874a6350ef574104e5d
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