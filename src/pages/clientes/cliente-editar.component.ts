import { Component } from '@angular/core';
import { Cliente } from '../../model/cliente'; //si pongo "/cliente" da error , no se pq
import { NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../service/cliente.service';
import { ClienteListComponent } from './cliente-list.component';
import { VariosService } from '../../service/varios.service';
import { Settings } from '../../model/settings';
import { SettingsService } from '../../service/settings.service';

import {

    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

declare var window;
declare var cordova;
@Component({
    templateUrl: 'cliente-editar.html',
    providers: [ClienteService],
})

export class ClienteEditarComponent {

    public myForm: FormGroup;
    cliente: Cliente;
    settings: Settings;
	versionPro: boolean;

    constructor(private _nav: NavController, private _navParams: NavParams,
        private fb: FormBuilder,
        private s: SettingsService,
        private clienteService: ClienteService,
        private _varios: VariosService) {
        let params = _navParams;
        this.cliente = new Cliente();
        

        if (params.data.length > 0) {
            this.cliente = Cliente.inicializa(params.data[0]);
        }
        console.log("editando cliente id " + this.cliente.id);
        this.myForm = this.fb.group({
            'id': [this.cliente.id],
            'nombre': [this.cliente.nombre, Validators.required],
            'personaContacto': [this.cliente.personaContacto],
            'telefono': [this.cliente.telefono, Validators.pattern("[0-9]{9}")],
            'telefono2': [this.cliente.telefono2, Validators.pattern("[0-9]{9}")],
            'email': [this.cliente.email],
            'direccion': [this.cliente.direccion],
            'poblacion': [this.cliente.poblacion],
            'cp': [this.cliente.cp],
            'provincia': [this.cliente.provincia],
            'cif': [this.cliente.cif],
            'observaciones': [this.cliente.observaciones]
            
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
        });}

        ionViewDidLoad() {
            this.s.getData().then((data)=>{
              let tmp = JSON.parse(data);
              this.settings=Settings.inicializa(tmp);
              if(this.settings.versionPro != true){
                this.versionPro= false;
            } else{
                this.versionPro = this.settings.versionPro;
            }
            });}
        
    llama() {
        if (this.cliente.telefono !== null && this.cliente.telefono.length > 0) {
            console.log("Llamando al " + this.cliente.telefono);
            // window.open( "tel:" + this.cliente.telefono);
            cordova.InAppBrowser.open("tel:" + this.cliente.telefono, "_system", "location=true");
        } else {
            console.log("No es un teléfono válido para llamar");
        }
    }
    cancelar() {
        this._nav.pop();
    }

    onSubmit() {
        let f = this.myForm.value;



        this.clienteService.actualizaCliente(f.id, f.nombre, f.personaContacto, f.telefono, f.telefono2, f.email, f.direccion, f.poblacion, f.cp, f.provincia, f.cif, f.observaciones).then(
            (data) => {
                this._varios.showToast("Cliente guardado correctamente", "top");
            },
            (error) => {
                //console.log('Error cliente-editar.component ' );
                //console.log(error);
            }
        );

        this._nav.setRoot(ClienteListComponent);
    }
} 