import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

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

  versionPro = false;
  productos = [];
  comprasAnteriores = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private iap: InAppPurchase, private plt: Platform) {

    this.plt.ready().then(() => {
      console.log("PLATAFORMA LISTA");
      this.iap.getProducts([ID_COMPRA_PRO])
        .then((productos) => {
          this.productos = productos;
        })
        .catch((err) => {
          console.log(err);
        });
    })

  }

  comprar(producto) {
    this.iap.buy(producto).then(data => {
      this.activaProducto(producto);
    })
  }
 
  restaurar() {
    this.iap.restorePurchases().then(compras => {
      this.comprasAnteriores = compras;
      // Unlock the features of the purchases!
      for (let anteriores of this.comprasAnteriores) {
          this.activaProducto(anteriores.productId)
      }
    });
  }

  activaProducto(id) {
    // Normally store these settings/purchases inside your app or server!
    if (id === ID_COMPRA_PRO) {
      this.versionPro = true;
    } 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionProPage');
  }

}
