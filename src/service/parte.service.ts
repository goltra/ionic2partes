
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Parte } from '../model/parte';
import { Settings } from '../model/settings';
import { VariosService } from './varios.service';
import { SettingsService } from './settings.service';
import { EmailComposer, File } from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';
import { SocialSharing } from 'ionic-native';
import { Photo } from '../model/photo';

declare let jsPDF;
declare var cordova: any;

@Injectable()

export class ParteService {
  private db;
  private settings: Settings;
  private dirFiles: string;

  constructor(private _varios: VariosService, _db: DatabaseProvider, private platform: Platform, private s: SettingsService) {

    this.db = _db
    this.dirFiles = "";
    console.log("constructor ParteService");
    this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
      (success) => {
        console.log('no existe tabla parte y la creo');
        console.log(success);
      },
      (error) => {
        console.log("Error al crear la tabla parte: " + error);
      }
    );

    let sql: string;
    sql = "CREATE TABLE IF NOT EXISTS fotos (id INTEGER PRIMARY KEY AUTOINCREMENT, parteid INTEGER CONSTRAINT fk_parteid REFERENCES parte (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, base64 TEXT, nombre TEXT)";
    this.db.query(sql).then(
      success => {
        console.log('no existe tabla foto y la creo');
        console.log(success);
      },
      error => {
        console.log('error al crear tabla fotos');
        console.log(error);
      }
    );

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
  enviaPorEmail(parte: Parte) {
    //let msg:String; 
    let email;
    var doc = new jsPDF();
    let serieId: string;
    console.log("Compruebo si el componente EmailComposer está disponible.");
    EmailComposer.isAvailable().then(
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
            File.writeFile(this.dirFiles, tmpNom, pdfOutput, { replace: true }).then(
              (ok) => {
                console.log("fichero guardado en " + this.dirFiles);
                console.log(ok);
                email = {
                  to: '',
                  subject: 'Parte de trabajo nº ' + serieId,
                  body: <any>"Adjuntamos su parte de trabajo",
                  isHtml: true,
                  attachments: [this.dirFiles + tmpNom]
                };

                EmailComposer.open(email).then(
                  (sended) => {
                    console.log("email enviado ");
                    console.log(sended);
                    this._varios.showToast("Email enviado", "top");
                  },
                  (error) => {
                    console.log("error enviando mensaje ");
                    this._varios.showToast("Se produjo un error al enviar el Email", "top");
                    console.log(error);
                  }
                );
              },
              (err) => {
                console.log("error al guardar el fichero");
                console.log(err);
              }
            );
          } else {
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
      SocialSharing.share(body, subject, data).then(
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

        File.writeFile(this.dirFiles, nomTmp, obj, { replace: true }).then(success => {
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

