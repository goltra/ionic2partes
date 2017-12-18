import { VersionProPage } from './../version-pro/version-pro';
import { Component } from '@angular/core';
import { NavController, MenuController, Platform } from 'ionic-angular';
import { ClienteListComponent } from '../clientes/cliente-list.component';
import { ParteListComponent } from '../parte/parte-list.component';
import { ClienteEditarComponent } from '../clientes/cliente-editar.component';
import { SettingsComponent } from '../settings-component/settings-component';
import { VariosService } from '../../service/varios.service';
import { DatabaseProvider } from '../../provider/database.provider';
import { SettingsService } from '../../service/settings.service';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/Rx';
import { File } from '@ionic-native/file';
import { EstadisticasPage } from './../estadisticas/estadisticas';
import { Settings } from '../../model/settings';


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
	settings: Settings;
	versionPro: boolean;



	constructor(private navCtrl: NavController, private menu: MenuController, private v: VariosService,
		platform: Platform, private s: SettingsService, private file: File,
		public sqlporter:SQLitePorter,public db:DatabaseProvider) {

		//inicialización de variables
		this.menu.enable(true);
		this.dia = v.getNowDate();
		this.platform = platform;
		if (this.platform.is('cordova') == false){
			console.log("ESTOY EN EL NAVEGADOR");
		} else{
			console.log("ESTOY CON EL MOVIL");
		
		//seteo ids para anuncios según plataforma
		if (/(android)/i.test(navigator.userAgent)) {
			this.admobId = {
				banner: 'ca-app-pub-2437670687236295/4965506279',
				//interstitial: 'ca-app-pub-jjj/kkk'
			};
		} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
			this.admobId = {
				banner: 'ca-app-pub-2437670687236295/1732838274',
			};
		}
	}
	}
	createBanner() {
		const muestroanuncios: boolean = !this.versionPro; // Elijo si quiero anuncios o no
		console.log("¿CREO EL BANER?");
		console.log(!this.versionPro);
		// console.log("Connection " + this.online.toString() + ". No creo el banner"); 
		this.platform.ready().then(() => {
			if (AdMob && muestroanuncios) {
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
	exportBD(){
		console.log('db');
		console.log(this.db.db);
		this.sqlporter.exportDbToJson(this.db.db).then(res=>{
			 console.log(res);
			let data = res.data.inserts;
			for(let item in data){
				if(data[item].length>0){
					console.log(item);
					console.log(data[item]);
				}
			}
			
			console.log(data);
		}).catch(err=>{console.log('error'); console.log(err)})
	}
	ionViewDidLoad() {
		this.s.getData().then((data)=>{
			let tmp = JSON.parse(data);
			this.settings=Settings.inicializa(tmp);
			if(this.settings.versionPro != true){
				this.versionPro= false;
			} else{
				this.versionPro = this.settings.versionPro;
			}
			
			if(this.versionPro && this.platform.is('cordova')){
				AdMob.removeBanner();
			  }
			
		console.log('ionViewDidLoad');
		console.log("¿ENTRO PARA CREAR EL BANNER?");
		console.log(this.versionPro);
	
		if (/(ipod|iphone|ipad|android)/i.test(navigator.userAgent) && this.versionPro == false) {
			
			this.platform.ready().then(() => {
				console.log('Platform ready');
				console.log(this.platform);
				this.createBanner();
			}
			);
		}
	});
	}


	ionViewCanEnter(){ 
		this.s.getData().then((data)=>{
		  let tmp = JSON.parse(data);
		  this.settings=Settings.inicializa(tmp);
		  if(this.settings.versionPro != true){
			this.versionPro= false;
		} else{
			this.versionPro = this.settings.versionPro;
		}
		if(this.versionPro && this.platform.is('cordova')){
		
				AdMob.removeBanner();
			
		  }
		});}

	clientelist() {
		this.navCtrl.push(ClienteListComponent);
	}
	partelist() {
		this.navCtrl.push(ParteListComponent);
	}
	clienteedit() {
		this.navCtrl.push(ClienteEditarComponent);
	}
	estadisticasmostrar() {
		this.navCtrl.push(EstadisticasPage);
	}
	versionpromostrar() {
		this.navCtrl.push(VersionProPage);
	}

	test() {
		console.log('test');
		this.file.listDir(cordova.file.applicationStorageDirectory, 'databases').then(
			(files) => {
				console.log('applicationStorageDirectory');
				console.log(files);
			},
			(error) => {
				console.log('error');
				console.log(error);
			}
		);

	}


	showSettings() {
		this.navCtrl.push(SettingsComponent);
	}
}
