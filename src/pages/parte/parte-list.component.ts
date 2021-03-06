import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import {ParteEditarComponent} from './parte-editar.component';
import {Parte} from '../../model/parte';
import { SettingsService } from '../../service/settings.service';
import { Settings } from '../../model/settings';


@Component({
  templateUrl: 'parte-list.component.html',
  //providers: [ParteService,VariosService]
})
export class ParteListComponent {
  
  public partes:any[];
  versionPro: boolean;
  settings: Settings;
  
  constructor(private navCtrl: NavController, private parteService: ParteService,
  private varios: VariosService, private s: SettingsService, private alertCtrl: AlertController) {
    this.listadoPartes();
  }
 
  listadoPartes(){
    this.parteService.listaPartes().then(
      (data)=>{
        console.log('cargando partes');
       // console.log('Encontrados '+data.rows.length+' partes');
        this.partes=[];

        if(data.rows.length>0){
          for (let i = 0; i < data.rows.length; i++) {
                let item = data.rows.item(i);
                this.partes.push(Parte.inicializa(item));
              
                }
           return this.partes;        
        }
      },
      (error)=>{
        console.log("Error cargando los partes "  +  error.message);
      }
    ).catch((error)=>{
      console.log("Error cargando en listadoPartes "  +  error.message);
    }).then((res)=>{console.log(res)});
  }
  
  cargaParte(parte:Parte){
    this.navCtrl.push(ParteEditarComponent,[parte]);
  }
  crearParte(clienteid:number){
    console.log('crearParte()');
    this.navCtrl.push(ParteEditarComponent);
  }

  ionViewCanEnter(){ 
    this.s.getData().then((data)=>{
      let tmp = JSON.parse(data);
      this.settings=Settings.inicializa(tmp);
      this.versionPro = this.settings.versionPro;
    });}

    ionViewDidLoad() {
      console.log('ionViewDidLoad parte-list component');
      this.s.getData().then((data)=>{
        let tmp = JSON.parse(data);
        this.settings=Settings.inicializa(tmp);
        this.versionPro = this.settings.versionPro;
      });
    }

  eliminaParte(parteid: number){

     let confirm = this.alertCtrl.create({
      title: 'Borrar Parte',
      message: 'Va a borrar el parte de trabajo. Esta acción no puede deshacerse. ¿Desea continuar?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('borrar NO');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('borrar SI');
            this.parteService.elimina(parteid).then((data)=>{
              this.varios.showToast("Parte Eliminado","top");
              this.listadoPartes();
            });
          }
        }
      ]
    });
    confirm.present();
  }
  enviarEmail(parte: Parte){
    console.log('Envía parte');
    if(this.versionPro){
      this.parteService.generarPdf(parte);
    }else{
      this.parteService.enviaPorEmail(parte);
    }
   
  }
}
