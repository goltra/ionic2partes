import {Component, ViewChild} from '@angular/core';
import {Parte} from '../../model/parte';
import {NavController, NavParams} from 'ionic-angular';
import {FormsModule,
        ReactiveFormsModule,
        FormBuilder,
        FormGroup,
        Validators,
        AbstractControl} from '@angular/forms';
import {ParteService} from '../../service/parte.service';
import {VariosService} from '../../service/varios.service';
import {ParteListComponent} from './parte-list.component';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import {Keyboard} from 'ionic-native';


@Component({
    templateUrl:'parte-editar.component.html',
})



export class ParteEditarComponent{
    public myForm: FormGroup;
    public firmaImg: string;
    private nuevo: boolean;
    parte: Parte;
    @ViewChild(SignaturePad) signaturePad: SignaturePad;

    constructor(private _nav: NavController, private _navParams: NavParams,
                private fb: FormBuilder,
                private parteService: ParteService,
                private  _varios: VariosService){
       let params = _navParams;

       this.parte = new Parte();

       let clienteid:number;

       console.log(this.signaturePad);

       if(!isNaN(Number(params.get('clienteid')))){ //para checkear que viene un valor numerico en el parametro
          //este caso siempre se debe dar cuando se trata de un nuevo parte.
           this.nuevo=true;
           clienteid =params.get('clienteid');
           this.parte.clienteid=clienteid;
           this.parte.fecha=_varios.getNowDateIso();
           this.parte.horaini=this.parte.fecha;
           this.parte.horafin=this.parte.fecha;
           //TODO: Horaini y fecha por defcto la del día
           //Todo: Horafin por defecto la seteada en horaini y no poder poner una inferior
       } else {
           this.nuevo=false;
           this.parte = Parte.inicializa(params.data[0]);
           console.log("Editando parte con id " + this.parte.id);

       }



       this.myForm = this.fb.group({
           'id':[this.parte.id],
           'clienteid':[this.parte.clienteid],
           'fecha': [this.parte.fecha],
           'horaini': [this.parte.horaini],
           'horafin':[this.parte.horafin],
           'trabajorealizado':[this.parte.trabajorealizado],
           'personafirma':[this.parte.personafirma],
           'firma':[this.parte.firma],
       });


    }

    // ionViewDidEnter() {
    //     let canvas        = document.getElementById('signature-pad');
    //     this.signaturePad = new SignaturePad(canvas);
    // }
    cancelar(){
        this._nav.pop();
    }
    countRows(e){
       console.log(e);
    //    let numLineas=e.target.value.split("\n").length;
    //    e.target.style.height='auto';
    //    e.target.style.height = e.target.scrollHeight + 'px';
    //    console.log(e.target.scrollHeight);
    }
    onSubmit(){
        let f = this.myForm.value;
        console.log(this.myForm.value);
        this.parteService.actualizaParte(f);
        this._nav.setRoot(ParteListComponent);
    }

    signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
        'minWidth': 0.5,
        'maxWidth': 2,
        'canvasWidth': 500,
        'canvasHeight': 300,
        'backgroundColor': '#FAFAFA',

    };
  drawStart(){
    console.log("comieza a firmar y oculto teclado");
    Keyboard.close();
  }
  ngAfterViewInit() {

    // this.signaturePad is now available
    this.signaturePad.options=this.signaturePadOptions; // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    if(this.parte.firma!==null){
        this.signaturePad.fromDataURL(this.parte.firma);
        this.firmaImg=this.parte.firma;
        console.log("asignar firma guardada a canvas");
    }
  }

  doOnEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmaImg=this.signaturePad.toDataURL();
    this.myForm.value.firma=this.firmaImg;
  }
  limpiarFirma(){
    this.signaturePad.clear();
  }
  borrarFirma(){
    console.log("borrar firma");
    this.myForm.value.firma=null;
    this.firmaImg=null;
    //inicializo de nuevo el signaturPad, no se porqu tras estar oculto
    //y ponerlo visible el canvas pierde el height y el width
    this.signaturePad.options=this.signaturePadOptions;
    this.signaturePad.clear();
  }
  
  aceptaFirma(){
      this.doOnEnd();
  }
}
