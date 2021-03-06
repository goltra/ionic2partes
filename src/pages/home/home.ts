import { VersionProPage } from './../version-pro/version-pro';
import { Component } from '@angular/core';
import { NavController, MenuController, Platform, ModalController } from 'ionic-angular';
import { ClienteListComponent } from '../clientes/cliente-list.component';
import { ParteListComponent } from '../parte/parte-list.component';
import { PopupPage} from '../popup/popup';
import { ClienteEditarComponent } from '../clientes/cliente-editar.component';
import { SettingsComponent } from '../settings-component/settings-component';
import { VariosService } from '../../service/varios.service';
import { DatabaseProvider } from '../../provider/database.provider';
import { SettingsService } from '../../service/settings.service';
import { NotificacionesService } from '../../service/notificaciones.service';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import 'rxjs/Rx';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { File } from '@ionic-native/file';
import { EstadisticasPage } from './../estadisticas/estadisticas';
import { Settings } from '../../model/settings';
import { SocialSharing } from '@ionic-native/social-sharing';


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
	private dirFiles: string;



	constructor(private navCtrl: NavController, private menu: MenuController, private v: VariosService,
		platform: Platform, private s: SettingsService, private file: File,
		public sqlporter: SQLitePorter, public db: DatabaseProvider, private socialSharing: SocialSharing,
		public modal: ModalController,public notificaciones: NotificacionesService,
		public http:Http ) {

		//inicialización de variables
		this.menu.enable(true);
		this.dia = v.getNowDate();
		this.platform = platform;
		if (this.platform.is('cordova') == false) {
			console.log("ESTOY EN EL NAVEGADOR");
		} else {
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
	comprobarNotificaciones(){
		this.http.get('https://www.goltratec.com/partesdetrabajo/index.php')
			.map(res => res.json()).subscribe(data => {
				if (data.notificaciones != undefined) {
					this.notificaciones.existeId(data.notificaciones[0].id).then(resolve=>{
						if(!resolve){
							this.paginaModal(data.notificaciones[0].id, data.notificaciones[0].imagen, data.notificaciones[0].texto);
						}
					})
					
				}
			})
	}
	paginaModal(id,imagen,texto){
		let pModal = this.modal.create(PopupPage,{'id':id,'imagen':imagen,'texto':texto});
		pModal.onDidDismiss(data => {
			if(data.id!=""){
				this.notificaciones.save(data);
			}
		});

		pModal.present();
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
	escChar(str: any): string {
		if (typeof str == "string")
			return str.replace('/\\([\s\S])|(") / g', '\\\\$1$2');
		else
			return '';
	}
	exportBD() {
		this.sqlporter.exportDbToJson(this.db.db).then(res => {
			let data = res.data.inserts;
			let lineas = '';
			//leo las propiedades del objeto que en realidad son
			//las tablas.
			for (let item in data) {
				if (data[item].length > 0) {
					let ray = data[item];
					let cabecera = '';
					let count = 0;
					//leo cada registro de la tabla
					ray.forEach(element => {
						//leo las propiedades de cada registro para
						//construir la linea
						let linea: string = '';
						for (let p in element) {
							if (count == 0) {
								console.log('hago cabecera');
								if (cabecera.length == 0)
									cabecera = '\"' + p + '\"';
								else
									cabecera = cabecera + ';' + '\"' + p + '\"';
							}

							if (linea.length == 0) {
								linea = '\"' + this.escChar(element[p]) + '\"';
							} else {
								linea = linea + ';' + '\"' + this.escChar(element[p]) + '\"';
							}
						}

						if (count == 0) {
							lineas = lineas + '\r\n' + cabecera + '\r\n' + linea + '\r\n';
						} else {
							lineas = lineas + linea + '\r\n';
						}
						count = count++;
					})
				}

			}
			if (lineas.length > 0) {
				lineas += "\r\n Las imagenes son en formato base64. Copie la columna de la imagen y peguela en https://codebeautify.org/base64-to-image-converter";
				this.guardaCSV(lineas, 'datos' + ".csv");

			}



		}).catch(err => { console.log('error'); console.log(err) })
	}
	guardaCSV(csv, fileName) {
		if (this.platform.is('cordova')) {
			// console.log('guardaCSV');
			// console.log(csv);
			this.file.writeFile(this.dirFiles, fileName, csv, { replace: true }).then(
				(ok) => {
					console.log("Fichero guardado en " + this.dirFiles);
					console.log(ok);
					this.socialSharing.share('fichero exportado', fileName, this.dirFiles + fileName);
				});
		}

	}
	ionViewDidLoad() {

		this.comprobarNotificaciones();
		this.s.getData().then((data) => {
			let tmp = JSON.parse(data);
			this.settings = Settings.inicializa(tmp);
			if (this.settings.versionPro != true) {
				this.versionPro = false;
			} else {
				this.versionPro = this.settings.versionPro;
			}

			if (this.versionPro && this.platform.is('cordova')) {
				AdMob.removeBanner();
			}

			// console.log('ionViewDidLoad');
			// console.log("¿ENTRO PARA CREAR EL BANNER?");
			// console.log(this.versionPro);

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


	ionViewCanEnter() {
		this.s.getData().then((data) => {
			let tmp = JSON.parse(data);
			this.settings = Settings.inicializa(tmp);
			if (this.settings.versionPro != true) {
				this.versionPro = false;
			} else {
				this.versionPro = this.settings.versionPro;
			}
			if (this.versionPro && this.platform.is('cordova')) {

				AdMob.removeBanner();

			}
		});
		this.platform.ready().then(() => {
			if (this.platform.is("ios")) {
				console.log('Directorio para ios');
				this.dirFiles = cordova.file.tempDirectory;
			}

			if (this.platform.is("android")) {
				console.log("Directorio para android");
				console.log(cordova);
				this.dirFiles = cordova.file.externalDataDirectory;
			}
		})
	}

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
