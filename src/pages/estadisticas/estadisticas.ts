// import { Chart } from 'chart.js';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstadisticasProvider } from './../../provider/estadisticas.provider';

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
  barChart: any;
	private estadistica: EstadisticasProvider;
  @ViewChild('barCanvas') barCanvas;
 
  

  constructor(public navCtrl: NavController, public _estadistica: EstadisticasProvider, public navParams: NavParams) {

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

}
