import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import {ParteEditarComponent} from './parte-editar.component';
import {Parte} from '../../model/Parte';


@Component({
  templateUrl: 'build/pages/parte/parte-list.component.html',
  providers: [ParteService,VariosService]
})
export class ParteListComponent {
  
  public partes: Parte[];
  
  constructor(private navCtrl: NavController, private parteService: ParteService) {
    this.listadoPartes();
  }

  listadoPartes(){
    this.parteService.listaPartes().then(
      (data)=>{
        console.log('cargando partes');
        this.partes=[];
        if(data.res.rows.length>0){
          for (let i = 0; i < data.res.rows.length; i++) {
                        let item = data.res.rows.item(i);
                        this.partes.push(item);
                    }
        }
      },
      (error)=>{
        console.log("Error cargando los partes "  +  error.err.message);
      }
    );
  }
  cargaParte(parte:Parte){
    this.navCtrl.push(ParteEditarComponent,[parte]);
  }
  crearParte(clienteid:number){
    console.log('crearParte()');
    this.navCtrl.push(ParteEditarComponent);
  }
}