import { Parte } from '../../model/parte';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
export declare class ParteEditarComponent {
    private _nav;
    private _navParams;
    private fb;
    private parteService;
    private _varios;
    myForm: FormGroup;
    firmaImg: string;
    private nuevo;
    parte: Parte;
    signaturePad: SignaturePad;
    constructor(_nav: NavController, _navParams: NavParams, fb: FormBuilder, parteService: ParteService, _varios: VariosService);
    cancelar(): void;
    countRows(e: any): void;
    onSubmit(): void;
    signaturePadOptions: Object;
    ngAfterViewInit(): void;
    doOnEnd(): void;
    aceptaFirma(): void;
}
