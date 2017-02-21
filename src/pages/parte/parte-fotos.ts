import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParteService } from '../../service/parte.service';
import { Photo } from '../../model/photo';

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
  fotos: Array<Photo>;
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
          this.fotos[i] = Photo.inicializa(data.rows.item(i));
        }
        console.log(this.fotos);
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
  comparte() {
    if (this.fotos && this.fotos.length > 0)
      this.parteService.sharePhoto(this.fotos, this.parteid, "");
  }
}
