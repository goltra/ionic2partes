import { Settings } from './../../model/settings';
import { EstadisticasService } from './../../service/estadisticas.service';
// import { Chart } from 'chart.js';
import { Component, ViewChild, OnChanges } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EstadisticasProvider } from './../../provider/estadisticas.provider';
import * as moment from 'moment';
import 'moment/locale/es';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

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
  //public numpartesdias: any;
  public numparteshoy: any;
  public numpartesdelasemana: any;
  public numpartesmes: any;
  barChart: any;
  private estadistica: EstadisticasProvider;
  public dias;

  public datospromesa: Array<Array<any>>;
  public termina;        
  public etiquetas: Array<string>;
  public datos: Array<string>;
  public colorfondo: Array<string>;
  public colorborde: Array<string>;
  public imgChartBase64: String;
  private settings: Settings;

  
   




  @ViewChild('barCanvas') barCanvas;
 
  

  constructor(public navCtrl: NavController, public _estadistica: EstadisticasProvider, private screenOrientation: ScreenOrientation, public navParams: NavParams, public estadisticasServ: EstadisticasService) {
    this.datospromesa = [this.etiquetas,this.datos,this.colorfondo,this.colorborde];
     this.etiquetas = [];
     this.datos = [];
     this.colorfondo = [];
     this.colorborde = [];

    this.dias = 5; // Días a mostar en las estadisticas
    this.estadistica = _estadistica;
	this.estadistica.numeropartes().then(data => {
			this.numpartes = data;
            });
    /*this.estadistica.numeropartesdias(1).then(data => {
			this.numpartesdias = data;
            });*/
    this.estadistica.numeropartesdeldia(moment()).then(data => {
			this.numparteshoy = data;
            });
    this.estadistica.numeropartesdelasemana(moment()).then(data => {
			this.numpartesdelasemana = data;
            });
    this.estadistica.numeropartesdelmes(moment()).then(data => {
			this.numpartesmes = data;
            });
  }

  ionViewDidLoad() {

   this.estadisticasdia(this.dias);

   // detect orientation changes
    this.screenOrientation.onChange().subscribe(
       () => {
           console.log("Orientation Changed");
       }
    );

   
  }

  

 

  estadisticasdia(dias): Promise<any> {
		return new Promise((resolve) => { 
    
           // this.datospromesa = [this.etiquetas,this.datos,this.colorfondo,this.colorborde];
            let colorresto = 'rgba(102,178,255,0.5)';
            let colorhoy = 'rgba(200,50,78,0.5)';
            let colorborderesto = 'rgba(0,128,255,1)';
            let colorbordehoy = 'rgba(150,13,78,1)';
            dias--;
            console.log("DIA - "+dias);
                        if(dias>=0){
                        let fechadia = moment().subtract(dias, 'days');
                        this._estadistica.numeropartesdeldia(fechadia).then(data => {  

                            console.log("ESPERANDO RECIBIR DATO");
                            this.datos.push(data);
                           // console.log("Datos["+dias+"] -> "+this.datos[dias]);
                            let diasemana = fechadia.format("ddd, D, MMM");
                            this.etiquetas.push(diasemana);
                             if(fechadia.isSame(moment(),'day')){
                            console.log("La fecha es hoy");
                            this.colorfondo.push(colorhoy);
                            this.colorborde.push(colorbordehoy);
                            } else {
                                //console.log("Las fechas no coinciden");
                                this.colorfondo.push(colorresto);
                                this.colorborde.push(colorborderesto);
                                }
                        this.estadisticasdia((dias));
                        });
                                
                        } else{
                            this.pintagrafica();
                        }
                        
               
                resolve(this.datospromesa);
                
             });
  }


//   estadisticasdia(dias): Promise<any> {
// 		return new Promise((resolve) => { 
    
//             let datospromesa: Array<Array<any>>;
//             let termina;        
//             let etiquetas: Array<string>;
//             let datos: Array<string>;
//             let colorfondo: Array<string>;
//             let colorborde: Array<string>;
            
//             etiquetas = [];
//             datos = [];
//             colorfondo = [];
//             colorborde = [];
            
        
//             datospromesa = [etiquetas,datos,colorfondo,colorborde];
        
        
//             let colorresto = 'rgba(102,178,255,0.5)';
//             let colorhoy = 'rgba(200,50,78,0.5)';
          
        
//             let colorborderesto = 'rgba(0,128,255,1)';
//             let colorbordehoy = 'rgba(150,13,78,1)';
        
//             for (let i = 0; i < dias; i++) {
//                         //console.log("Resto "+i+ "dias");
//                         let fechadia = moment().subtract(i, 'days');
//                         let diasemana = fechadia.format("ddd, D, MMM");
//                         etiquetas.push(diasemana);
//                         this._estadistica.numeropartesdeldia(fechadia).then(data => {
                            
//                             console.log("ESPERANDO RECIBIR DATO");
                            
//                             //console.log("Data -> "+data);
//                             datos.push(data);
//                             console.log("Datos["+i+"] -> "+datos[i]);
//                         });
//                         if(i==0){
//                             //console.log("La fecha es hoy");
//                             colorfondo.push(colorhoy);
//                             colorborde.push(colorbordehoy);
//                         } else {
            
//                                 //console.log("Las fechas no coinciden");
//                                 colorfondo.push(colorresto);
//                                 colorborde.push(colorborderesto);
//                         }
                        
                      
//                         }
               
//                 resolve(datospromesa);
                
//              });
//   }
    pintagrafica(){ // num -> numero de dias a pintar
        
       // this.estadisticasdia(num).then(data => {
       
        
        console.log("ENTRO A PINTAR LA GRAFICA");
        this.barChart = new Chart(this.barCanvas.nativeElement, {
                   type: 'bar',
                   responsive: true,
            data: {
                labels: this.etiquetas,
                datasets: [{
                    label: 'Número de partes',
                    data: this.datos,
                    backgroundColor: 
                       this.colorfondo,
                    borderColor: this.colorborde,
                    borderWidth: 1
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: 10,
                            beginAtZero:true,
                            fixedStepSize: 1
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            beginAtZero:true,
                            fixedStepSize: 1
                        },
                    }]
                },
                legend: {
                    fontSize: 10
                },
                animation: {
                     onComplete: function(){
                        console.log("TERMINO LA ANIMCAION DE LA GRAFICA");
                        //this.sacoImagenGrafica();
                    }
                }
            }

           
 
            });
        // console.log("CONVIERTO GRAFICA A IMG 64");
        // this.imgChartBase64 = this.barChart.toBase64Image();
        // console.log(this.imgChartBase64);
        
       // this.barChart.onAnimationComplete(this.imgChartBase64 = this.barChart.toBase64Image());
        
        
        // });
    }

    enviarEmail(){
    console.log('envia email');

    console.log("CONVIERTO GRAFICA A IMG 64");
        this.imgChartBase64 = this.barChart.toBase64Image();
        console.log(this.imgChartBase64);
    
    this.estadisticasServ.cargoSettings().then(data => {
            this.settings = data;
            //console.log(data);
            console.log("Tecnico -> "+this.settings.tecnico);
            console.log("IMG BASE 64 GRAFICA -> "+this.imgChartBase64); 
            this.estadisticasServ.enviaPorEmail(this.settings,this.imgChartBase64,this.numpartes,this.numparteshoy,this.numpartesdelasemana,this.numpartesmes);
        });
  }


  
}



    // this.barChart = new Chart(this.barCanvas.nativeElement, {
     
    //        type: 'bar',
    // data: {
    //     labels: etiquetas,
    //     datasets: [{
    //         label: 'Número de partes',
    //         data: datos,
    //         backgroundColor: 
    //             colorfondo,
    //         borderColor: colorborde,
    //         borderWidth: 1
    //     }]
    // },
    // options: {
    //     scales: {
    //         yAxes: [{
    //             ticks: {
    //                 beginAtZero:true,
    //                 fixedStepSize: 1
    //             }
    //         }]
    //     }
    // }
 
    //     });

  
