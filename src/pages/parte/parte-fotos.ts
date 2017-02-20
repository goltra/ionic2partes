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
  imagen: string; //imagen seleccionada para verla en grande

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

        for (let i = 0; i < data.rows.length; i++) {
          this.fotos[i] = data.rows.item(i);
        }
       
      }
    }).catch((error) => {
      console.log('error cargando la fotos para mostrarlas');
    });
  }
  borrarFoto(index: any) {
    this.parteService.borraFoto(index);
    this.getFotos();
    let el = document.getElementById(index);
    el.parentNode.removeChild(el);
  }
  verImagen(index:any){
    let el: HTMLElement = document.getElementById('visor');
    let f: any = this.fotos.find((data:any) => data.id=index);
    
    if (f){
      this.imagen = f.base64;
      el.style.visibility = "visible"
    } else{
      console.log('no se puedo cargar la imagen para mostrarla');
    }
    
    
  }
}
