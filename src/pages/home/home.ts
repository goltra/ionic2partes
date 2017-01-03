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
import {Network,File} from 'ionic-native';


declare var AdMob: any;
declare var navigator: any;
declare var Connection: any;
declare var cordova: any;


@Component({
  templateUrl: 'home.html',
})

export class HomePage {
  public dia: string;
  // public online: boolean;
  private admobId: any;
  private platform: Platform;

  

  constructor(private navCtrl: NavController,private menu: MenuController, private v: VariosService,
	 platform: Platform, private settings: SettingsService) {
	 
	//inicialización de variables
	 this.menu.enable(true);
	 this.dia  = v.getNowDate();
	 this.platform=platform;
	
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
  
  ionViewDidLoad() {
		  console.log('ionViewDidLoad');

		  if(/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)){
				this.platform.ready().then(()=>{
					 console.log('Platform ready');
					 console.log(this.platform);
					 this.createBanner();
					 }
				);
		  }
	 }
	
  clientelist(){
	 this.navCtrl.push(ClienteListComponent);
  }
  partelist(){
	 this.navCtrl.push(ParteListComponent);
  }
  clienteedit(){
	 this.navCtrl.push(ClienteEditarComponent);
  }
  
  test(){
	  console.log('test');
	  File.listDir(cordova.file.applicationStorageDirectory,'databases').then(
			(files)=>{
				console.log('applicationStorageDirectory');
				console.log(files);
			},
			(error)=>{
				console.log('error');
				console.log(error);
			}
	  );

  }

  
  showSettings(){
	 this.navCtrl.push(SettingsComponent);
  }
}
