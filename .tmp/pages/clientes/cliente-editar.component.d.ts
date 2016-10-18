import { NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../service/cliente.service';
import { VariosService } from '../../service/varios.service';
import { FormBuilder, FormGroup } from '@angular/forms';
export declare class ClienteEditarComponent {
    private _nav;
    private _navParams;
    private fb;
    private clienteService;
    private _varios;
    myForm: FormGroup;
    constructor(_nav: NavController, _navParams: NavParams, fb: FormBuilder, clienteService: ClienteService, _varios: VariosService);
    cancelar(): void;
    onSubmit(): void;
}
