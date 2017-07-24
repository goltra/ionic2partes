
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
import * as moment from 'moment';
import 'moment/locale/es';

declare let jsPDF;
declare var cordova: any;
declare let Chart;

@Injectable()

export class EstadisticasService {
  private settings: Settings;
  private dirFiles: string;
  private db;

  constructor(private _varios: VariosService, _db: DatabaseProvider, private platform: Platform, private s: SettingsService) {
    this.db = _db;
    this.dirFiles = "";
    


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

    
  cargoSettings(): Promise<any> {
		console.log("Cargo los settings");
		return new Promise((resolve) => {
      this.s.getData().then((data) => {
          let tmp = JSON.parse(data);
          console.log("cargo valores settings");
          resolve(Settings.inicializa(tmp));
          
        }
			).catch(error => {
		  console.log("ERROR Cargando los settings!!");
          resolve(null);
        });
		});
	}
  

  

  
  
  enviaPorEmail(settings: any, barChart: String, partesTotal: number, partesHoy: number, partesSemana: number, partesMes: number) {
    //let msg:String; 
    let email;
    var doc = new jsPDF('landscape');
    let asuntoEmail: String = "";

    this.settings = settings;
  
    console.log("Compruebo si el componente EmailComposer está disponible.");
    console.log("Tec -> "+this.settings.tecnico);
    EmailComposer.isAvailable().then(
      (available) => {
        console.log("Email composer disponible");
        console.log("Texto que voy a incluir en pdf");
        console.log(this.settings);
        if (this.settings != undefined) {
          console.log('settings no es undefined');
          console.log("Seteo texto a negrita");
          doc.setFontStyle('bold');
          doc.text(20, 20, "Fecha: " +moment().format('DD MMMM YYYY'));
          doc.text(20, 30, "Número de partes total: " +partesTotal);
          doc.text(20, 40, "Número de partes hoy : " +partesHoy);
          doc.text(20, 50, "Número de partes esta semana: " +partesSemana);
          doc.text(20, 60, "Número de partes este mes " +partesMes);
          console.log(this.settings.tecnico);
          if (this.settings.tecnico != undefined || this.settings.tecnico != ""){
            doc.text(20, 70, "Trabajador: " + this.settings.tecnico);
            asuntoEmail = " de "+this.settings.tecnico; // Esto es para luego rellenar el asunto del email
          } 

          doc.text(20, 80, "Gráfica:");
          console.log("seteo fuente a normal");
          doc.setFontStyle('normal');
         if (barChart != undefined) {
           console.log("La grafica está defininda, procedemos a pintarla");
            doc.addImage(barChart, "PNG", 4, 100, 150, 90); // izq, arriba, ancho, alto
          }
         // doc.text(20, 90, "Número de partes este mes " +partesMes);

          
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
          console.log("PREPARAMOS EL EMAIL");
          if (this.platform.is("cordova")) {
            console.log('Creo el pdf');
            let tmpNom: string = Math.random().toString().replace('.', '');
            tmpNom = tmpNom + 'partesTrabajoPdf.pdf';

            tmpNom = 'estadisticasTrabajoPdf.pdf';
            File.writeFile(this.dirFiles, tmpNom, pdfOutput, { replace: true }).then(
              (ok) => {
                console.log("fichero guardado en " + this.dirFiles);
                console.log(ok);
                


                email = {
                  to: '',
                  subject: 'Estadísticas de partes de tabajo'+asuntoEmail,
                  body: <any>"Adjuntamos estadísticas",
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

  // enviaPorEmail(barChart: any, partesTotal: number, partesHoy: number, partesSemana: number, partesMes: number)  {
  //   //let msg:String; 

    

  //   /////////////////
  //   let email;
  //   var doc = new jsPDF();
  //   let serieId: string;
  //   console.log("Compruebo si el componente EmailComposer está disponible.");
  //   EmailComposer.isAvailable().then(
  //     (available) => {
  //       console.log("Email composer disponible");
  //       console.log("Texto que voy a incluir en pdf");
  //       console.log(this.settings);
        
  //       if (this.settings != undefined) {
  //         console.log('settings no es undefined');
  //         console.log(this.settings.serie);

  //         /*if (this.settings.serie != undefined) {
  //           serieId = (this.settings.serie.length > 0 ? (this.settings.serie + "/" + String(parte.id)) : String(parte.id));
  //         } else {
  //           serieId = String(parte.id);
  //         }*/
  //         if (this.settings.imagenBase64 != undefined && this.settings.imagenBase64.length > 0) {
  //           doc.addImage(this.settings.imagenBase64, "JPEG", 140, 20);
  //         }
  //         console.log("Seteo texto a negrita");
  //         doc.setFontStyle('bold');
  //         doc.text(20, 20, "Parte de Trabajo Número " + serieId);
  //         /*doc.text(20, 30, "Cliente: " + parte.nombre);
  //         doc.text(20, 40, "Fecha: " + parte.fechaformato);
  //         doc.text(20, 50, "Horas: " + parte.horainiformato + ' a ' + parte.horafinformato);*/

  //         if (this.settings.tecnico != undefined)
  //           doc.text(20, 60, "Le atendió: " + this.settings.tecnico);

  //         doc.text(20, 70, "Trabajo Realizado");
  //         console.log("seteo fuente a normal");
  //         doc.setFontStyle('normal');
  //         //console.log("parte.trabajorealizado -> " + (parte.trabajorealizado == null ? "" : parte.trabajorealizado));
  //         console.log("parto el texto trabajorealizado en lineas ");
  //         //doc.text(20, 80, doc.splitTextToSize((parte.trabajorealizado == null ? "" : parte.trabajorealizado), 180));

  //         console.log("compruebo si hay firma");
  //         /*if (parte.firma != null) {
  //           doc.setFontStyle('bold');
  //           doc.text(20, 200, "Firmado por: ");
  //           doc.setFontStyle('normal');
  //           if (parte.personafirma != null)
  //             doc.text(20, 210, parte.personafirma);
  //           console.log("añado la firma al pdf");
  //           doc.addImage(parte.firma, 'PNG', 20, 220, 50, 50);
  //         }*/
  //         doc.setFontSize(8);
  //         let tmpText: string;
  //         tmpText = "";

  //         if (this.settings != undefined) {
  //           if (this.settings.empresa != null)
  //             tmpText = this.settings.empresa + "  ";
  //           if (this.settings.cif != null)
  //             tmpText = tmpText + this.settings.cif + "  ";
  //           if (tmpText != "")
  //             doc.text(20, 275, "Empresa proveedora de servicios: " + tmpText);
  //         }

  //         console.log("guardo el contenido del pdf (blob) en una variable");
  //         let pdfOutput = doc.output('blob');

  //         //preparamos el email según lleve o no adjunto (firma)
  //         if (this.platform.is("cordova")) {
  //           console.log('Creo el pdf');
  //           let tmpNom: string = Math.random().toString().replace('.', '');
  //           tmpNom = tmpNom + 'partesTrabajoPdf.pdf';

  //           tmpNom = 'partesTrabajoPdf.pdf';
  //           File.writeFile(this.dirFiles, tmpNom, pdfOutput, { replace: true }).then(
  //             (ok) => {
  //               console.log("fichero guardado en " + this.dirFiles);
  //               console.log(ok);
  //               email = {
  //                 to: '',
  //                 subject: 'Parte de trabajo nº ' + serieId,
  //                 body: <any>"Adjuntamos su parte de trabajo",
  //                 isHtml: true,
  //                 attachments: [this.dirFiles + tmpNom]
  //               };

  //               EmailComposer.open(email).then(
  //                 (sended) => {
  //                   console.log("email enviado ");
  //                   console.log(sended);
  //                   this._varios.showToast("Email enviado", "top");
  //                 },
  //                 (error) => {
  //                   console.log("error enviando mensaje ");
  //                   this._varios.showToast("Se produjo un error al enviar el Email", "top");
  //                   console.log(error);
  //                 }
  //               );
  //             },
  //             (err) => {
  //               console.log("error al guardar el fichero");
  //               console.log(err);
  //             }
  //           );
  //         } else {
  //           console.log("pdf(): cordova no disponible");
  //         }
  //       }
  //     },
  //     (error) => {
  //       console.log("EmailComposer no está disponible");
  //       console.log("EmailComposer: ");
  //       console.log(error);
  //     }
  //   );

  // }

  /*sharePhoto(photos: Array<Photo>, idParte: number, nomcliente: string) {

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
  }*/

  /*private imgToArrayAndSave(imgB64Ray): Promise<any> {
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
  }*/
}

