import { Component } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';


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
 

  constructor(public navCtrl: NavController, public navParams: NavParams, private iap: InAppPurchase, private plt: Platform, private s: SettingsService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 3000
    });
    loader.present();
    
    this.plt.ready().then(() => {
      this.iap.getProducts([ID_COMPRA_PRO])
        .then((productos) => {
          this.productos = productos;
          loader.dismiss();
        })
        .catch((err) => {
          console.log(err);
          loader.dismiss();
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


  comprar(producto) {
    let loader = this.loadingCtrl.create({
      content: "Cargando"
    });
    loader.present();
    this.iap.buy(producto).then(data => {
      loader.dismiss();
      this.activaProducto(producto);
    })
    .catch((err) => {
      console.log(err);
      loader.dismiss();
      if (this.plt.is('ios')){
        let alert = this.alertCtrl.create({
          title: 'Fallo en la compra',
          subTitle: 'Lamentamos informar que no ha sido posible conectar con la AppStore, por favor, revise su conexión o pruebe más tarde',
          buttons: ['Aceptar']
        });
        alert.present();
      } else if(this.plt.is('android')){
        let alert = this.alertCtrl.create({
          title: 'Fallo en la compra',
          subTitle: 'Lamentamos informar que no ha sido posible conectar con Play Store, por favor, revise su conexión o pruebe más tarde',
          buttons: ['Aceptar']
        });
        alert.present();
          }else if(this.plt.is('windows')){
            let alert = this.alertCtrl.create({
              title: 'Fallo en la compra',
              subTitle: 'Lamentamos informar que no ha sido posible conectar con Windows Store, por favor, revise su conexión o pruebe más tarde',
              buttons: ['Aceptar']
            });
            alert.present();
            } else{
              let alert = this.alertCtrl.create({
                title: 'Fallo en la compra',
                subTitle: 'Lamentamos informar que no ha sido posible conectar con la tienda, por favor, revise su conexión o pruebe más tarde',
                buttons: ['Aceptar']
              });
              alert.present();
              }
    });
  }


 
  restaurar() {
    let loader = this.loadingCtrl.create({
      content: "Cargando"
    });
    loader.present();
    if(this.plt.is('ios')==false && this.plt.is('android')==false && this.plt.is('windows')==false && this.plt.is('cordova')==false ){
       if(this.versionPro == false){
         console.log("ACTIVO PRODUCTO EN NAVEGADOR PARA DEBUG");
        this.activaProducto(ID_COMPRA_PRO);
       } else{
        console.log("DESACTIVO PRODUCTO EN NAVEGADOR PARA DEBUG");
         this.desactivaProducto(ID_COMPRA_PRO);
       }
    }else{
    this.iap.restorePurchases().then(compras => {
      loader.dismiss();
      console.log('compras');
      console.log(compras);
      this.comprasAnteriores = compras;
      // Unlock the features of the purchases!
      for (let anteriores of this.comprasAnteriores) {
          this.activaProducto(anteriores.productId)
      }

    })
    .catch((err) => {
      console.log('in app error');
      console.log(err);
      loader.dismiss();
      if (this.plt.is('ios')){
        let alert = this.alertCtrl.create({
          title: 'Fallo en la restauración',
          subTitle: 'Lamentamos informar que no ha sido posible conectar con la AppStore, por favor, revise su conexión o pruebe más tarde',
          buttons: ['Aceptar']
        });
        alert.present();
      } else if(this.plt.is('android')){
        let alert = this.alertCtrl.create({
          title: 'Fallo en la restauración',
          subTitle: 'Lamentamos informar que no ha sido posible conectar con Play Store, por favor, revise su conexión o pruebe más tarde',
          buttons: ['Aceptar']
        });
        alert.present();
          }else if(this.plt.is('windows')){
            let alert = this.alertCtrl.create({
              title: 'Fallo en la restauración',
              subTitle: 'Lamentamos informar que no ha sido posible conectar con Windows Store, por favor, revise su conexión o pruebe más tarde',
              buttons: ['Aceptar']
            });
            alert.present();
            } else{
              let alert = this.alertCtrl.create({
                title: 'Fallo en la restauración',
                subTitle: 'Lamentamos informar que no ha sido posible conectar con la tienda, por favor, revise su conexión o pruebe más tarde',
                buttons: ['Aceptar']
              });
              alert.present();
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

desactivaProducto(id) {
  // Normally store these settings/purchases inside your app or server!
  if (id === ID_COMPRA_PRO) {
    this.versionPro = false;
    this.settings.versionPro=this.versionPro;
    this.s.save(this.settings);
  } 
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad VersionProPage');
  }



}
