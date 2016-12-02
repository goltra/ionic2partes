import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';
import { VariosService } from '../../service/varios.service';

/*
  Generated class for the SettingsComponent page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings-component',
  templateUrl: 'settings-component.html'
})
export class SettingsComponent {

  constructor(public navCtrl: NavController, private s: SettingsService, private v: VariosService) {}
  settings: Settings;
  serie:string;
  logo: string;
  ionViewDidLoad() {

  }
  ionViewCanEnter(){
    //Aunque el método estatico inicializa devuelve un objeto de tipo Settigs,
    //creo el objeto y llamo al constructor para que debido al asyncronismo
    //no sea null en cas de cargar el formulario antes de haber devuelto el objeto
    this.settings=new Settings();
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      this.serie = this.settings.serie;
      console.log(this.settings);
    });
  }
  submitForm(){
    console.log("Guardando settings");
    console.log(this.settings);
    this.s.save(this.settings);
    this.v.showToast("Configuración Guardada","top");
    this.navCtrl.pop();
  }
  guardaLogo(){
    console.log("guarda logo");
  }

}
