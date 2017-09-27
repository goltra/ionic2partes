import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';


const ID_COMPRA_PRO = 'com.goltratec.partestrabajo.versionpro';

/**
 * Generated class for the VersionProPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-version-pro',
  templateUrl: 'version-pro.html',
})
export class VersionProPage {
  settings: Settings;
  versionPro: boolean;
  productos = [];
  comprasAnteriores = [];
  textoVersionPro="Actualizar a Versión Premium.";
  soypro: String = "VERSIÓN PRO ACTIVADA";

  constructor(public navCtrl: NavController, public navParams: NavParams, private iap: InAppPurchase, private plt: Platform, private s: SettingsService) {
    

    this.plt.ready().then(() => {
      this.iap.getProducts([ID_COMPRA_PRO])
        .then((productos) => {
          this.productos = productos;
        })
        .catch((err) => {
          console.log(err);
          if (this.plt.is('ios')){
          this.textoVersionPro="No se ha podido establecer la conexión con AppStore";
          } else if(this.plt.is('android')){
            this.textoVersionPro="No se ha podido establecer la conexión con Play Store";
              }else if(this.plt.is('windows')){
                  this.textoVersionPro="No se ha podido establecer la conexión con Windows Store";
                } else{
                  this.textoVersionPro="No se ha podido establecer la conexión con la tienda";
                  }
        });
    })

  }

  ionViewCanEnter(){ 
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      this.versionPro = this.settings.versionPro;
    });}

  usarioPro(){
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      return this.settings.versionPro;
    });}

  comprar(producto) {
    this.iap.buy(producto).then(data => {
      this.activaProducto(producto);
    })
  }
 
  restaurar() {
    if(this.plt.is('ios')==false && this.plt.is('android')==false && this.plt.is('windows')==false){
      this.activaProducto(ID_COMPRA_PRO);
    }else{
    this.iap.restorePurchases().then(compras => {
      this.comprasAnteriores = compras;
      // Unlock the features of the purchases!
      for (let anteriores of this.comprasAnteriores) {
          this.activaProducto(anteriores.productId)
      }

    });
  }
  }

  activaProducto(id) {
    // Normally store these settings/purchases inside your app or server!
    if (id === ID_COMPRA_PRO) {
      this.versionPro = true;
      this.settings.versionPro=this.versionPro;
      this.s.save(this.settings);
    } 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionProPage');
  }



}
