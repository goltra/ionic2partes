export declare class DatabaseProvider {
    db: any;
    dbname: string;
    constructor();
    /**
     * Init - init database etc. PS! Have to wait for Platform.ready
     */
    init(): Promise<any>;
    /**
     * query - executes sql
     */
    query(q: string, params?: any): Promise<any>;
}
