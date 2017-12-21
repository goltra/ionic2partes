import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';


/**
 * Generated class for the PopupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popup',
  templateUrl: 'popup.html',
})
export class PopupPage {
  imagen ="";
  texto="";
  id="";
  nomostrar=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    this.init();
  }

  init(){
    this.imagen = this.navParams.get('imagen');
    this.texto = this.navParams.get('texto');
    this.id = this.navParams.get('id');
  }

  dismiss() {
    let data = { 'id': '' };
    if(this.nomostrar){
      data = { 'id': this.id };
    }
    this.viewCtrl.dismiss(data);
  }


}
