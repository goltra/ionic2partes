// import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstadisticasProvider } from './../../provider/estadisticas.provider';
<<<<<<< HEAD
import * as moment from 'moment';
import 'moment/locale/es';
=======
>>>>>>> 035a84ccb26e35284bf28874a6350ef574104e5d

declare let Chart;

/*
  Generated class for the Estadisticas page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-estadisticas',
  templateUrl: 'estadisticas.html'
})
export class EstadisticasPage {
  public numpartes: any;
<<<<<<< HEAD
  public numpartesdias: any;
  barChart: any;
  private estadistica: EstadisticasProvider;
  public dias;
=======
  barChart: any;
	private estadistica: EstadisticasProvider;
>>>>>>> 035a84ccb26e35284bf28874a6350ef574104e5d
  @ViewChild('barCanvas') barCanvas;
 
  

  constructor(public navCtrl: NavController, public _estadistica: EstadisticasProvider, public navParams: NavParams) {
<<<<<<< HEAD
    
    this.dias = 7; // Días a mostar en las estadisticas
    this.estadistica = _estadistica;
	this.estadistica.numeropartes().then(data => {
			this.numpartes = data;
            });
    this.estadistica.numeropartesdias(1).then(data => {
			this.numpartesdias = data;
            });
    
  }

  ionViewDidLoad() {

   this.estadisticasdia(this.dias);

    //    console.log('ionViewDidLoad EstadisticasPage');
  }

  estadisticasdia(dias){ 
    
    let etiquetas: Array<string>;
    let datos: Array<string>;
    let colorfondo: Array<string>;
    let colorborde: Array<string>;
    
    etiquetas = [];
    datos = [];
    colorfondo = [];
    colorborde = [];


    let colorresto = 'rgba(102,178,255,0.5)';
    let colorhoy = 'rgba(200,50,78,0.5)';
  

    let colorborderesto = 'rgba(0,128,255,1)';
    let colorbordehoy = 'rgba(150,13,78,1)';

    for (let i = 0; i < dias; i++) {
                //console.log("Resto "+i+ "dias");
                let fechadia = moment().subtract(i, 'days');
                let diasemana = fechadia.format("ddd, D, MMM");
                etiquetas.push(diasemana);
                this._estadistica.numeropartesdeldia(fechadia).then(data => {
                    console.log("Data -> "+data);
                    datos.push(data);
                    console.log("Datos["+i+"] -> "+datos[i]);
                });
                if(i==0){
                    //console.log("La fecha es hoy");
                    colorfondo.push(colorhoy);
                    colorborde.push(colorbordehoy);
                } else {
    
                        //console.log("Las fechas no coinciden");
                        colorfondo.push(colorresto);
                        colorborde.push(colorborderesto);
                }
              
                }

    this.barChart = new Chart(this.barCanvas.nativeElement, {
     
           type: 'bar',
    data: {
        labels: etiquetas,
        datasets: [{
            label: 'Número de partes',
            data: datos,
            backgroundColor: 
                colorfondo,
            borderColor: colorborde,
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
 
        });

   }
=======

    this.estadistica = _estadistica;
		this.estadistica.numeropartes().then(data => {
			this.numpartes = data;
			});

  }

  ionViewDidLoad() {

    
   this.barChart = new Chart(this.barCanvas.nativeElement, {
 
            type: 'bar',
            data: {
                labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
                datasets: [{
                    label: 'Número de partes',
                    data: [5, 3, 9, 7, 0, 1, 11],
                    backgroundColor: [
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)',
                        'rgba(102, 178, 255, 0.5)'
                    ],
                    borderColor: [
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)',
                        'rgba(0,128,255,1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
 
        });



    console.log('ionViewDidLoad EstadisticasPage');
  }

>>>>>>> 035a84ccb26e35284bf28874a6350ef574104e5d
}
