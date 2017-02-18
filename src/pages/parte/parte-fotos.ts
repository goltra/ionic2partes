import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParteService } from '../../service/parte.service';

/*
  Generated class for the ParteFotos page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-parte-fotos',
  templateUrl: 'parte-fotos.html'
})
export class ParteFotosPage {
  parteid: number;
  rows: Array<number>;
  fotos: Array<Array<any>>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public parteService: ParteService) {
    this.parteid = navParams.get('parteid');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParteFotosPage');
    this.getFotos();
  }

  getFotos() {
    this.fotos = [];
    this.parteService.cargaFotosParte(this.parteid).then((data) => {
      if (data.rows.length > 0) {
        let filas: number = 0;
        //numero de filas que hay que pintar.
        /*this.rows = Array(filas).fill().map((x,i)=>i);
        Array(5).fill().map((x,i)=>i);*/

        for (let i = 0; i < data.rows.length; i+=2) {
          this.fotos[filas]=[];
          if(data.rows.item(i))
            this.fotos[filas][0] = data.rows.item(i);
          
          if(data.rows.item(i+1))
            this.fotos[filas][1]=data.rows.item(i+1);
          
          filas++;
        }
      }
    }).catch((error)=>{
      console.log('error cargando la fotos para mostrarlas');
    });
  }

}
