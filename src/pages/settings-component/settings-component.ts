import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';
import { VariosService } from '../../service/varios.service';
import { Camera} from 'ionic-native';

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
      this.logo = this.settings.imagen;
      console.log(this.settings);
    });
  }
  submitForm(){
    console.log("Guardando settings");
    this.settings.imagen=this.logo;
    console.log(this.settings);
    this.s.save(this.settings);
    this.v.showToast("Configuración Guardada","top");
    this.navCtrl.pop();
  }
  removeImage(){
    this.logo = "";
  }
  getCamera(){
    let options= {
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      destinationType: Camera.DestinationType.FILE_URI
    }
    Camera.getPicture(options).then(
      (imageData) => {
          console.log('obteniendo imagen');
          let base64Image = 'data:image/jpeg;base64,' + imageData;
          console.log(base64Image);
          this.logo = imageData;
        }, 
        (err) => {
          console.log("Error al capturar imagen");
          console.log(err);
        }
    );
  }

}
