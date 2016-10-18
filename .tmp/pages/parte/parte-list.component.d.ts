import { NavController } from 'ionic-angular';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { Parte } from '../../model/parte';
export declare class ParteListComponent {
    private navCtrl;
    private parteService;
    private varios;
    partes: any[];
    constructor(navCtrl: NavController, parteService: ParteService, varios: VariosService);
    listadoPartes(): void;
    cargaParte(parte: Parte): void;
    crearParte(clienteid: number): void;
    eliminaParte(parteid: number): void;
    enviarEmail(parte: Parte): void;
}
