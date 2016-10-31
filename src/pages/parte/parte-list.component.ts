import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import {ParteEditarComponent} from './parte-editar.component';
import {Parte} from '../../model/parte';


@Component({
  templateUrl: 'parte-list.component.html',
  //providers: [ParteService,VariosService]
})
export class ParteListComponent {
  
  public partes:any[];
  
  constructor(private navCtrl: NavController, private parteService: ParteService,private varios: VariosService) {
    this.listadoPartes();


  }
 
  listadoPartes(){
    this.parteService.listaPartes().then(
      (data)=>{
        console.log('cargando partes');
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

  eliminaParte(parteid: number){
    this.parteService.elimina(parteid).then((data)=>{
      this.varios.showToast("Parte Eliminado","top");
      this.listadoPartes();
    });
  }
  enviarEmail(parte: Parte){
    console.log('envia email');
    this.parteService.enviaPorEmail(parte);
  }
}