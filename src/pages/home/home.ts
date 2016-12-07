import {Component} from '@angular/core';
import {NavController,MenuController, Platform} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ParteListComponent} from '../parte/parte-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';
import {SettingsComponent} from '../settings-component/settings-component';
import {VariosService} from '../../service/varios.service';
import {SettingsService} from '../../service/settings.service';
import {Settings} from '../../model/settings';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
 import {Network} from 'ionic-native';


declare var AdMob: any;
declare var navigator: any;
declare var Connection: any;

@Component({
  templateUrl: 'home.html',
})

export class HomePage {
  public dia: string;
  // public online: boolean;
  private admobId: any;
  private platform: Platform;
  

  constructor(private navCtrl: NavController,private menu: MenuController, v: VariosService,
	 platform: Platform, private settings: SettingsService) {
	 
	//inicialización de variables
	 this.menu.enable(true);
	 this.dia  = v.getNowDate();
	 this.platform=platform;
	 // this.online=false;

	
	 //seteo ids para anuncios según plataforma
	 if(/(android)/i.test(navigator.userAgent)) {
			 this.admobId = {
				  banner: 'ca-app-pub-2437670687236295/4965506279',
				  //interstitial: 'ca-app-pub-jjj/kkk'
			 };
		} else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
			 this.admobId = {
				  banner: 'ca-app-pub-2437670687236295/1732838274',
			 };
		}

  }
  createBanner() {
		  // console.log("Connection " + this.online.toString() + ". No creo el banner"); 
		  this.platform.ready().then(() => {
				if(AdMob) {
				  console.log("Creo el banner"); 
				  console.log('AdMob disponible');
					 AdMob.createBanner({
						  adId: this.admobId.banner,
						  autoShow: true,
						  position: AdMob.AD_POSITION.BOTTOM_CENTER
					 });
				}
		  });
	 }
  // displayAd(status: boolean): boolean{
	 // try{
		//   console.log('checkConnection ' + this.online.toString());
		//   if(AdMob!=null){
		// 	 if((this.online!=status) && status==false){
		// 	 	console.log('oculto banner');
		// 		AdMob.hideBanner();
		// 	 }
		// 	 if((this.online!=status) && status==true){
		// 	 	console.log('muestro banner');
		// 	 	console.log(AdMob);
		// 	 	this.createBanner();
		// 	 }
		//   } else {
		// 	 console.log('checkConnection. AdMob es null');
		//   }
	 // } catch(ex) {
		//   console.log("error checkConnection");
		//   console.log(ex);
		//   return false;
	 // }
  // }
  ionViewDidLoad() {
		  console.log('ionViewDidLoad');

		  if(/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)){
				this.platform.ready().then(()=>{
					 // let net = Network.onDisconnect().subscribe(() => {
					 // 	this.displayAd(false);
						// console.log('seteo this.online a false');
						// this.online=false;
						// console.log('network was disconnected :-(');
					 // });

					 // net = Network.onConnect().subscribe(() => {
					 // 	this.displayAd(true);
					 // 	console.log('seteo this.online a false');
						// this.online=true;
						// console.log('network connected!'); 
					 //  });
					 // console.log('Estado de la red ' + this.online.toString());
					 console.log('Platform ready');
					 console.log(this.platform);
					 this.createBanner();
					 });
		  }
	 }
	// ionViewWillEnter(){
	// 	console.log('ionViewWillEnter');

	// 	 if(/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)){
	// 			this.platform.ready().then(()=>{
	// 				 let net = Network.onDisconnect().subscribe(() => {
	// 				 	this.displayAd(false);
	// 					console.log('seteo this.online a false');
	// 					this.online=false;
	// 					console.log('network was disconnected :-(');
	// 				 });

	// 				 net = Network.onConnect().subscribe(() => {
	// 				 	this.displayAd(true);
	// 				 	console.log('seteo this.online a true');
	// 					this.online=true;
	// 					console.log('network connected!'); 
	// 				  });
	// 				 console.log('Estado de la red ' + this.online.toString());
	// 				 console.log('Platform ready');
	// 				 console.log(this.platform);
	// 				 this.createBanner();
	// 				 });
	// 	  }
	// }
  clientelist(){
	 this.navCtrl.push(ClienteListComponent);
  }
  partelist(){
	 this.navCtrl.push(ParteListComponent);
  }
  clienteedit(){
	 this.navCtrl.push(ClienteEditarComponent);
  }
  // setSetting(){
  //   let set: Settings
  //   set = new Settings();
  //   console.log("seteo setting")
  //   set.serie="AA";
  //   set.empresa="Empresa servicios";
  //   set.direccion="C/ la que sea";
  //   set.localidad="Catral";
  //   set.provincia="Alicante";
  //   set.cp="03158";
  //   set.cif="B00000000";
  //   console.log(set);
  //   console.log('guardo settings')
  //   this.settings.save(set);
  // }
  // getSetting(){
  //   console.log("recupero settings");
  //   let set: Settings;
  //
  //   this.settings.getData().then((res)=>{
  //     set = JSON.parse(res);
  //     console.log(Settings.inicializa(set));
  //   });
  //
  // }
  test(){
	 let s =new Settings();
    this.settings.getData().then((data)=>{
      let tmp = JSON.parse(data);
      s=Settings.inicializa(tmp);
      console.log(s);
    });
  }
  showSettings(){
	 this.navCtrl.push(SettingsComponent);
  }
}
