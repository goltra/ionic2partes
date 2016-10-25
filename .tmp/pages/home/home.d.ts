import { NavController, MenuController } from 'ionic-angular';
import { VariosService } from '../../service/varios.service';
export declare class HomePage {
    private navCtrl;
    private menu;
    dia: string;
    constructor(navCtrl: NavController, menu: MenuController, v: VariosService);
    clientelist(): void;
    partelist(): void;
    clienteedit(): void;
}
