import {Component} from '@angular/core';
import {NavController,MenuController, Platform} from 'ionic-angular';
import {ClienteListComponent} from '../clientes/cliente-list.component';
import {ParteListComponent} from '../parte/parte-list.component';
import {ClienteEditarComponent} from '../clientes/cliente-editar.component';
import {SettingsComponent} from '../settings-component/settings-component';
import {VariosService} from '../../service/varios.service';
import {SettingsService} from '../../service/settings.service';
import {Settings} from '../../model/settings';

declare var AdMob: any;



@Component({
  templateUrl: 'home.html',
})

export class HomePage {
  public dia: string;
  private admobId: any;
  private platform: Platform;
  constructor(private navCtrl: NavController,private menu: MenuController, v: VariosService,
    platform: Platform, private settings: SettingsService) {
    this.menu.enable(true);
    this.dia  = v.getNowDate();
    this.platform=platform;

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
        console.log('crea banner');
        this.platform.ready().then(() => {
            if(AdMob) {
              console.log('AdMob disponible');
                AdMob.createBanner({
                    adId: this.admobId.banner,
                    autoShow: true,
                    position: AdMob.AD_POSITION.BOTTOM_CENTER,
                });
            }
        });
    }
  ngAfterViewInit() {
      console.log('ngAfterViewInit');
        if(/(ipod|iphone|ipad|android)/i.test(navigator.userAgent)){
            this.platform.ready().then(()=>{
                console.log('platform ready');
                this.createBanner();
                });
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
  setSetting(){
    let set: Settings
    set = new Settings();
    console.log("seteo setting")
    set.serie="AA";
    set.empresa="Empresa servicios";
    set.direccion="C/ la que sea";
    set.localidad="Catral";
    set.provincia="Alicante";
    set.cp="03158";
    set.cif="B00000000";
    console.log(set);
    console.log('guardo settings')
    this.settings.save(set);
  }
  getSetting(){
    console.log("recupero settings");
    let set: Settings;

    this.settings.getData().then((res)=>{
      set = JSON.parse(res);
      console.log(Settings.inicializa(set));
    });

  }
  showSettings(){
    this.navCtrl.push(SettingsComponent);
  }
}
