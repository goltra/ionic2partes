import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Parte } from '../model/parte';
import { Settings } from '../model/settings';
import { VariosService } from './varios.service';
import { SettingsService } from './settings.service';
import { EmailComposer } from '@ionic-native/email-composer';
import { File } from '@ionic-native/file';
import { DatabaseProvider } from '../provider/database.provider';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Photo } from '../model/photo';
import { Cliente } from '../model/cliente'; 
import { ClienteService } from './cliente.service';
import { LoadingController } from 'ionic-angular';

declare let jsPDF;
declare var cordova: any;

@Injectable()

export class ParteService {
  private db;
  private settings: Settings;
  private dirFiles: string;
  cliente: Cliente;

  constructor(private _varios: VariosService, _db: DatabaseProvider, public loadingCtrl: LoadingController, private clienteService: ClienteService, private platform: Platform, private s: SettingsService, private emailComposer: EmailComposer, private socialSharing: SocialSharing, private file: File) {
    
    this.cliente = new Cliente();
    this.db = _db
    this.dirFiles = "";
   
    console.log("constructor ParteService");

    //seteo directorio para guardar ficheros.
    if (this.platform.is("ios")) {
      console.log('Directorio para ios');
      this.dirFiles = cordova.file.tempDirectory;
    }

    if (this.platform.is("android")) {
      console.log("Directorio para android");
      this.dirFiles = cordova.file.externalDataDirectory;
    }
    console.log(this.dirFiles);
  }

  listaPartes() {
    let sql: string;
    sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id order by parte.id desc';
    //ademas de listar los partes, aquí cargamos los settings. Si están en el constructor solo se cargan
    //una vez de modo que si se modifican mientras la aplicación está abierto no refrescan los valores a
    //la hora de usarlos.
    this.s.getData().then((data) => {
      let tmp = JSON.parse(data);
      console.log("cargo valores settings");
      this.settings = Settings.inicializa(tmp);
      console.log(this.settings);
    });
    return this.db.query(sql);
  }

  obtenerDatosCliente(clienteid: number) {
    let sql: string;
    sql = 'SELECT * FROM cliente WHERE id=?';
    return this.db.query(sql, [clienteid]);
  }

  cargaFotosParte(parteid: number) {
    let sql: string;
    sql = 'Select * from fotos where parteid=?';
    return this.db.query(sql, [parteid]);
  }
  elimina(parteid: number) {
    let sql: string;
    sql = 'delete from parte where id=?'
    return this.db.query(sql, [parteid]);
  }

  actualizaParte(f, photos): Promise<any> {
    return new Promise((resolve, reject) => {
      let sql: string;
      console.log('actualizaParte()');

      //datos
      if (f.id == null) {
        sql = "insert into parte values (?,?,?,?,?,?,?,?)";
      } else {
        sql = "update parte set id=?,clienteid=?,fecha=?,horaini=?,horafin=?,trabajorealizado=?,personafirma=?,firma=? where id=" + f.id;
      }

      //insert / update datos
      this.db.query(sql, [f.id, f.clienteid, f.fecha, f.horaini, f.horafin, f.trabajorealizado, f.personafirma, f.firma]).then(
        (data) => {
          this._varios.showToast("Parte guardado correctamente", "top");
          console.log("Insertado parte ");
          console.log(sql);
          console.log(data);
          if (f.id==null && data)
            f.id = data.insertId

        },
      ).then( //fotos
        (fotosData) => {
          resolve(f.id);
          if (photos.length == 0) {
            console.log('photos length 0, no hay fotos para guardar');
            return false;
          }
          let photosql: string = "";
          console.log('vamos a guardar las fotos');
          for (let p in photos) {
            let obj = photos[p];
            //id=0 indica que es una foto para insertar
            if (obj.id == 0) {
              photosql = "insert into fotos values (?,?,?,?)";
            } else {
              photosql = "update fotos set id=?,parteid=?,base64=?,nombre=? where parteid=" + f.id + " and id=" + obj.id;
            }
            //insert / update fotos
            console.log('f.id: ' + f.id);
            console.log(photosql);
            this.db.query(photosql, [null, f.id, obj.base64, obj.nombre]).then(
              (success) => {
                console.log('Fotos guardadas correctamente');
              },
              (error) => {
                console.log('Error guardando las fotos');
                console.log(error);
              });
          }
        }).catch(error => {
          console.log(error);
          reject("Error guardando el parte y las fotos");
        });
    });
  }

  borraFoto(index: number) {
    let sql: string = "delete from fotos where id=?";
    this.db.query(sql, [index]).then((success) => {
      this._varios.showToast('Foto eliminada correctamente', 'top');
    }).catch(error => {
      this._varios.showToast('Hubo un problema eliminado la foto', 'top', 'toastError', 200000);
    });

  }



  generarPdf(parte: Parte) {
    console.log("Entro a generar el PDF");
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 3000
    });
    loader.present();

    // let cliente: Cliente;
      console.log("CARGO DATOS DEL CLIENTE PARA GENERAR EL PARTE");
     this.obtenerDatosCliente(parte.clienteid).then((data) => {
       if (data.rows.length > 0) {
         for (let i = 0; i < data.rows.length; i++) {
          this.cliente = data.rows.item(0);
          console.log(this.cliente);
         }

     let descripcionShare: string;
     let asuntoShare: string;
     let nombrePdf: string;
     let numParte: String;
     if(this.settings.serie!=undefined){
      numParte = this.settings.serie+parte.id;
      } else{
       numParte = parte.id.toString();
      }
      // AQUÍ DEBERÍA IR EL NUMERO DE PARTE, PERO MIENTRAS Y PARA PRUEBAS ESTOY PONIENDO LA ID //
   
     let alturaExtra=0;
     if(parte.firma!= ''){
         alturaExtra = 30;
     } 
    
     descripcionShare = "Hola,"+'\n'+"Adjunto envío el parte de trabajo Nº "+numParte+'\n'+"Un cordial saludo.";
     asuntoShare = "Parte de trabajo Nº "+numParte;
     nombrePdf = "parte_"+parte.id+".pdf";
                    
     var partepdf = new jsPDF();
     var numPaginas = 1; // Variable para almacenar el numero de páginas total del documento inizalizada a 1
     var lineaActual = 0;
     // CABECERA //
     console.log("Generando cabecera...");
     partepdf.setFontSize(10);
     partepdf.setFontType('bold');
     partepdf.text(110, 15, "Parte de trabajo Nº "+numParte);
     partepdf.setLineWidth(0.3); // Defino grosor de linea horizontal
     partepdf.line(75, 18, 200, 18); // Linea horizontal
     partepdf.text(75, 25, "Cliente");
     partepdf.text(75, 30, "Dirección");
     partepdf.text(75, 35, "Localidad");
     partepdf.text(75, 40, "Provincia");
     partepdf.text(75, 45, "C.I.F./N.I.F.");
     partepdf.text(75, 50, "Teléfono");
     partepdf.setFontType('normal');
     partepdf.text(110, 25, this.cliente.nombre);
     if(this.cliente.direccion != null){
      partepdf.text(110, 30, this.cliente.direccion);
     }
     if(this.cliente.poblacion != null){
      partepdf.text(110, 30, this.cliente.poblacion);
     }
     if(this.cliente.provincia != null){
      partepdf.text(110, 30, this.cliente.provincia);
     }
     if(this.cliente.cif != null){
      partepdf.text(110, 30, this.cliente.cif);
     }
    partepdf.text(110, 50, this.cliente.telefono);

    // LOGO EMPRESA //
    console.log("Generando logo en cabecera (si lo hay)...");
    if(this.settings.imagenBase64!= '' && this.settings.imagenBase64 != null && this.settings.imagenBase64 != undefined){
      //partepdf.addImage(this.settings.imagenBase64, 'PNG', 15, 18, 50, 35);
      partepdf.addImage(this.settings.imagenBase64, 'PNG', 15, 18);
      } else{
        console.log("No hay logo");
      }

    // FIN LOGO EMPRESA //

     console.log("Cabecera generada");
     // FIN CABECERA //
     
     //ACTUACION//
     console.log("Generando área de actuacion...");
     partepdf.text("ACTUACIÓN", 105, 60, 'center');
     partepdf.line(10, 63, 200, 63); // Linea horizontal
     partepdf.setFontType('bold');
     partepdf.text(20, 70, "Fecha:");
     partepdf.text(20, 78, "Hora de inicio:");
     partepdf.text(110, 78, "Hora de fin:");
     partepdf.text(110, 70, "Trabajador:");
     partepdf.text(20, 93, "Trabajo realizado:");
     partepdf.setFontType('normal');
 

     partepdf.text(50, 70, parte.fechaformato); 
     partepdf.text(50, 78, parte.horainiformato+"h.");
     partepdf.text(140, 78, parte.horafinformato+"h.");
     if(this.settings.tecnico != undefined && this.settings.tecnico != null){
     partepdf.text(140, 70, this.settings.tecnico);
     }

     var splitNotas = partepdf.splitTextToSize(parte.trabajorealizado, 170);
     partepdf.text(splitNotas, 20, 100);
     console.log("Área de actuación generada");
     //FIN ACTUACION//
 
     let lineasTrabajoSol = parte.trabajorealizado.length/95;
     let alturaTrabajoSol = lineasTrabajoSol *5;
     lineaActual = 100+alturaTrabajoSol;
     console.log("LINEA ACTUAL -> "+lineaActual);
   
 
     // FOOTER //
     console.log("Generando footer...");
     for(var i=1;i<=+partepdf.internal.getNumberOfPages();i++) {
       console.log("Cambio a la pagina -> "+i);
       partepdf.setPage(i);
       if(this.settings.empresa!=undefined && this.settings.cif!=undefined && this.settings.direccion!=undefined && this.settings.cp!=undefined && this.settings.localidad!=undefined && this.settings.provincia!=undefined){
       partepdf.text(this.settings.empresa+" - "+this.settings.cif+" - "+this.settings.direccion, 105, 265, 'center');  
       partepdf.text(this.settings.cp+" - "+this.settings.localidad+" ("+this.settings.provincia+")", 105, 270, 'center'); 
       }  
       partepdf.text("Página "+i+" de "+partepdf.internal.getNumberOfPages(), 105, 285, 'center');
 
       // Firma verde //
       var imgMundoVerde = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAA5+GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzIgNzkuMTU5Mjg0LCAyMDE2LzA0LzE5LTEzOjEzOjQwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNS41IChNYWNpbnRvc2gpPC94bXA6Q3JlYXRvclRvb2w+CiAgICAgICAgIDx4bXA6Q3JlYXRlRGF0ZT4yMDE3LTA4LTA4VDA5OjM5OjI3KzAyOjAwPC94bXA6Q3JlYXRlRGF0ZT4KICAgICAgICAgPHhtcDpNb2RpZnlEYXRlPjIwMTctMDgtMDhUMDk6NDA6MzYrMDI6MDA8L3htcDpNb2RpZnlEYXRlPgogICAgICAgICA8eG1wOk1ldGFkYXRhRGF0ZT4yMDE3LTA4LTA4VDA5OjQwOjM2KzAyOjAwPC94bXA6TWV0YWRhdGFEYXRlPgogICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3BuZzwvZGM6Zm9ybWF0PgogICAgICAgICA8cGhvdG9zaG9wOkNvbG9yTW9kZT4zPC9waG90b3Nob3A6Q29sb3JNb2RlPgogICAgICAgICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjMzZGQ1NWE5LTRjZjUtNDUwYy04ODE5LTUzMTBkMGUwMDFkNDwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRvY3VtZW50SUQ+YWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ1NWQ1MWE1LWJjOWItMTE3YS1hZDQyLWIxMTc5YjE0NTBiNjwveG1wTU06RG9jdW1lbnRJRD4KICAgICAgICAgPHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD54bXAuZGlkOmFjYTY2MTYxLTIzYzUtNGI0YS04Mzk4LWFjYWU0MjRmMzZjMzwveG1wTU06T3JpZ2luYWxEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06SGlzdG9yeT4KICAgICAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgICAgICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0iUmVzb3VyY2UiPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6YWN0aW9uPmNyZWF0ZWQ8L3N0RXZ0OmFjdGlvbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0Omluc3RhbmNlSUQ+eG1wLmlpZDphY2E2NjE2MS0yM2M1LTRiNGEtODM5OC1hY2FlNDI0ZjM2YzM8L3N0RXZ0Omluc3RhbmNlSUQ+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDp3aGVuPjIwMTctMDgtMDhUMDk6Mzk6MjcrMDI6MDA8L3N0RXZ0OndoZW4+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDpzb2Z0d2FyZUFnZW50PkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1LjUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmFjdGlvbj5zYXZlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOjMzZGQ1NWE5LTRjZjUtNDUwYy04ODE5LTUzMTBkMGUwMDFkNDwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNy0wOC0wOFQwOTo0MDozNiswMjowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoTWFjaW50b3NoKTwvc3RFdnQ6c29mdHdhcmVBZ2VudD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OmNoYW5nZWQ+Lzwvc3RFdnQ6Y2hhbmdlZD4KICAgICAgICAgICAgICAgPC9yZGY6bGk+CiAgICAgICAgICAgIDwvcmRmOlNlcT4KICAgICAgICAgPC94bXBNTTpIaXN0b3J5PgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICAgICA8dGlmZjpYUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WFJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOllSZXNvbHV0aW9uPjcyMDAwMC8xMDAwMDwvdGlmZjpZUmVzb2x1dGlvbj4KICAgICAgICAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICAgICAgICAgPGV4aWY6Q29sb3JTcGFjZT42NTUzNTwvZXhpZjpDb2xvclNwYWNlPgogICAgICAgICA8ZXhpZjpQaXhlbFhEaW1lbnNpb24+NTA8L2V4aWY6UGl4ZWxYRGltZW5zaW9uPgogICAgICAgICA8ZXhpZjpQaXhlbFlEaW1lbnNpb24+NTA8L2V4aWY6UGl4ZWxZRGltZW5zaW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/Pm8DGPUAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOgAAFIIAAEVWAAAOpcAABdv11ofkAAAEO1JREFUeNrcmntwXFd9xz/n3Oe+JK20smxJ1sNy4odkJ46dB5DHJCY1LqQ8S1MyZUoZaNoyDC1T2jIwQMtA22k7LbTQMIEOheGVkPDoNJQkOHEcB8c2NrHj2IllPSzZsl6r1Uq7e1/n9I+7kleyndhJp+1w7pzdvffu3Xu/5/f6/n6/FVprfhWG+NAXutj/5CDJ9Gv7oSgCxzHZeuNmurpbM0KKd5TmyymtmQEuuVoabYIuadSjWqtZhYofDEGofSJCBALxCvc3/6dWxDAgDMPep3b94taB/rPWht5Ot2VV7oNexe+JogghxMVAVF81aH4BfBh4urrGV3b/bTvqOTNYwHZfM5YdwGOGwdvGzsztPNU/Ml8pFT/X0dV2jdJ6Ra1MagHEIDQavQp4H+i9oE/F31No1GVJRJqmgWEKtHrNIP4DSALU1YNh8Lbnj5z9q+HBkU9m6tLDWi88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';
       partepdf.addImage(imgMundoVerde, 'PNG', 15, 278, 8, 8);
       partepdf.setTextColor(45, 90, 45);
       partepdf.setFontSize(7);
       partepdf.text("Cuidemos del medio ambiente.", 25, 282);
       partepdf.text("Por favor, no imprima este parte si no es necesario.", 25, 285);
       partepdf.setTextColor(0, 0, 0);
       partepdf.setFontSize(12);
       // Fin firma verde //
     }
     if(parte.firma!= '' && parte.firma != null){
     partepdf.addImage(parte.firma, 'PNG', 20, 225, 51, 30);
     partepdf.text("Fdo. "+parte.personafirma, 20, 255); 
     } else{
       console.log("No hay firma de cliente");
     }
     console.log("Footer generado con éxito");
     // FIN FOOTER //
      console.log("Guardo el contenido del pdf (blob) en una variable");

      let pdfOutput = partepdf.output('blob');
      
      console.log('Creo el pdf');
              if (this.platform.is('cordova')) {
               this.file.writeFile(this.dirFiles, nombrePdf, pdfOutput, { replace: true }).then(
                 (ok) => {
                   loader.dismiss();
                   console.log("Fichero guardado en " + this.dirFiles);
                   console.log(ok); 
                 });
                
                 // You are on a device, cordova plugins are accessible
                   this.socialSharing.share(descripcionShare, asuntoShare, this.dirFiles + nombrePdf);
                     } else {
                       loader.dismiss();
                           // Cordova not accessible, add mock data if necessary
                          //window.open(this.dirFiles + nombrePdf);
                          //partepdf.output("dataurlnewwindow");
                          partepdf.save(nombrePdf);
                         }
        
       }
        }).catch((error) => {
          console.log(error);
          loader.dismiss();
          console.log('error cargando datos de cliente');
          });
   }




  enviaPorEmail(parte: Parte) {
    let loader = this.loadingCtrl.create({
      content: "Cargando",
      duration: 3000
    });
    loader.present();
    //let msg:String; 
    let email;
    var doc = new jsPDF();
    let serieId: string;
    console.log("Compruebo si el componente EmailComposer está disponible.");
    this.emailComposer.isAvailable().then(
      (available) => {
        console.log("Email composer disponible");
        console.log("Texto que voy a incluir en pdf");
        console.log(this.settings);
        if (this.settings != undefined) {
          console.log('settings no es undefined');
          console.log(this.settings.serie);

          if (this.settings.serie != undefined) {
            serieId = (this.settings.serie.length > 0 ? (this.settings.serie + "/" + String(parte.id)) : String(parte.id));
          } else {
            serieId = String(parte.id);
          }
          if (this.settings.imagenBase64 != undefined && this.settings.imagenBase64.length > 0) {
            doc.addImage(this.settings.imagenBase64, "JPEG", 140, 20);
          }
          console.log("Seteo texto a negrita");
          doc.setFontStyle('bold');
          doc.text(20, 20, "Parte de Trabajo Número " + serieId);
          doc.text(20, 30, "Cliente: " + parte.nombre);
          doc.text(20, 40, "Fecha: " + parte.fechaformato);
          doc.text(20, 50, "Horas: " + parte.horainiformato + ' a ' + parte.horafinformato);

          if (this.settings.tecnico != undefined)
            doc.text(20, 60, "Le atendió: " + this.settings.tecnico);

          doc.text(20, 70, "Trabajo Realizado");
          console.log("seteo fuente a normal");
          doc.setFontStyle('normal');
          console.log("parte.trabajorealizado -> " + (parte.trabajorealizado == null ? "" : parte.trabajorealizado));
          console.log("parto el texto trabajorealizado en lineas ");
          doc.text(20, 80, doc.splitTextToSize((parte.trabajorealizado == null ? "" : parte.trabajorealizado), 180));

          console.log("compruebo si hay firma");
          if (parte.firma != null) {
            doc.setFontStyle('bold');
            doc.text(20, 200, "Firmado por: ");
            doc.setFontStyle('normal');
            if (parte.personafirma != null)
              doc.text(20, 210, parte.personafirma);
            console.log("añado la firma al pdf");
            doc.addImage(parte.firma, 'PNG', 20, 220, 50, 50);
          }
          doc.setFontSize(8);
          let tmpText: string;
          tmpText = "";

          if (this.settings != undefined) {
            if (this.settings.empresa != null)
              tmpText = this.settings.empresa + "  ";
            if (this.settings.cif != null)
              tmpText = tmpText + this.settings.cif + "  ";
            if (tmpText != "")
              doc.text(20, 275, "Empresa proveedora de servicios: " + tmpText);
          }

          console.log("guardo el contenido del pdf (blob) en una variable");
          let pdfOutput = doc.output('blob');

          //preparamos el email según lleve o no adjunto (firma)
          if (this.platform.is("cordova")) {
            console.log('Creo el pdf');
            let tmpNom: string = Math.random().toString().replace('.', '');
            tmpNom = tmpNom + 'partesTrabajoPdf.pdf';

            tmpNom = 'partesTrabajoPdf.pdf';
            this.file.writeFile(this.dirFiles, tmpNom, pdfOutput, { replace: true }).then(
              (ok) => {
                loader.dismiss();
                console.log("fichero guardado en " + this.dirFiles);
                console.log(ok);
                email = {
                  to: '',
                  subject: 'Parte de trabajo nº ' + serieId,
                  body: <any>"Adjuntamos su parte de trabajo",
                  isHtml: true,
                  attachments: [this.dirFiles + tmpNom]
                };

                this.emailComposer.open(email).then(
                  (sended) => {
                    console.log("email enviado ");
                    console.log(sended);
                    this._varios.showToast("Email enviado", "top");
                  },
                  (error) => {
                    loader.dismiss();
                    console.log("error enviando mensaje ");
                    this._varios.showToast("Se produjo un error al enviar el Email", "top");
                    console.log(error);
                  }
                );
              },
              (err) => {
                loader.dismiss();
                console.log("error al guardar el fichero");
                console.log(err);
              }
            );
          } else {
            loader.dismiss();
            console.log("pdf(): cordova no disponible");
          }
        }
      },
      (error) => {
        console.log("EmailComposer no está disponible");
        console.log("EmailComposer: ");
        console.log(error);
      }
    );

  }

  sharePhoto(photos: Array<Photo>, idParte: number, nomcliente: string) {

    let body = "Cliente: " + nomcliente;
    let subject = "Foto del parte: " + idParte;
    let imgB64Ray: Array<any> = [];
    body += " - Parte nº " + idParte;

    console.log("fotos recibida");
    for (let photo of photos) {
      //añado cada foto a un array
      let tmpB64 = photo.base64.split(",");
      imgB64Ray.push({ 'nombre': photo.nombre, 'base64': tmpB64[1] });
    }

    //guardo las imagenes en un directorio para enviarlas luego
    this.imgToArrayAndSave(imgB64Ray).then((data) => {
      console.log('Procedo a compartir');
      return (data);
    }).then((data) => {
      console.log(data);
      this.socialSharing.share(body, subject, data).then(
        res => {
          console.log('Comparto');
          console.log(res);
        }
      ).catch(error => {
        console.log('error compartiendo');
        console.log(error);
      });
    }).catch(error => {
      console.log('Error');
      console.log(error);
    });
  }

  private imgToArrayAndSave(imgB64Ray): Promise<any> {
    return new Promise((resolve, reject) => {
      let imgRay: Array<string>;
      imgRay = [];

      for (let img of imgB64Ray) {
        let obj = this._varios.base64toBlob(img.base64, 'image\jpg');
        let preNombre = Math.random().toString().replace('.', '');
        let nomTmp: string = preNombre + img.nombre + '.jpg';
        imgRay.push(this.dirFiles + "/" + nomTmp);

        this.file.writeFile(this.dirFiles, nomTmp, obj, { replace: true }).then(success => {
          console.log('fichero guardado');
          console.log(success);
        }).catch(error => {
          console.log('error al guardar el fichero');
          reject(error);
          console.log(error);
        });
      }
      resolve(imgRay);
      console.log('fin for');
    });
  }
}

