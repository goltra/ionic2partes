import { Platform, MenuController, Nav } from 'ionic-angular';
import { DatabaseProvider } from '../provider/database.provider';
export declare class MyApp {
    private menu;
    private db;
    rootPage: any;
    pages: any[];
    nav: Nav;
    constructor(platform: Platform, menu: MenuController, db: DatabaseProvider);
    openPage(p: any): void;
}
