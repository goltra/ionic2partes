import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import {Parte} from '../model/parte';
import {Settings} from '../model/settings';
import {VariosService} from './varios.service';
import {SettingsService} from './settings.service';
import {EmailComposer, File} from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';
declare let jsPDF;
declare var cordova: any;

@Injectable()

export class ParteService{
    private storage:any;
    private db;
    private settings: Settings;

    constructor(private _varios: VariosService, _db:DatabaseProvider, private platform: Platform, s: SettingsService){

        this.db = _db

        this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
                    (data)=>{

                    },
                    (error)=>{console.log("Error al crear la tabla parte: " + error.err.message)}
                );
        s.getData().then((data)=>{
          let tmp = JSON.parse(data);
          this.settings = Settings.inicializa(tmp);
          console.log("constructor parteservice");
          console.log(this.settings);
        });
    }

    listaPartes(){
        let sql:string;
        sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id order by parte.id desc';
        return this.db.query(sql);
    }
    elimina(parteid:number){
         let sql: string;
         sql = 'delete from parte where id=?'
         return this.db.query(sql,[parteid]);

    }
    cargarParte(id){
        let sql:string;
        sql = 'Select parte.*, cliente.* from parte inner join cliente on clienteid=cliente.id where parte.id=?';
        return this.db.query(sql,[id]).then(
            (data)=>{
                console.log("cargando parte con id " + id);
            },
            (error)=>{
                console.log("error al cargar el parte con el id " + id  + " - " + error.err.message);
            }
        );
    }
    actualizaParte(f){
        let sql: string;

        if(f.id==null){
            sql="insert into parte values (?,?,?,?,?,?,?,?)";
        } else {
            sql="update parte set id=?,clienteid=?,fecha=?,horaini=?,horafin=?,trabajorealizado=?,personafirma=?,firma=? where id=" + f.id;
        }
        this.db.query(sql,[f.id,f.clienteid, f.fecha,f.horaini,f.horafin,f.trabajorealizado,f.personafirma,f.firma]).then(
            (data)=>{
                this._varios.showToast("Parte guardado correctamente","top");
                console.log("Insertado parte ");
            },
            (error)=>{console.log("error al insertar parte "+ error.err.message);}
        );
    }
    enviaPorEmail(parte:Parte){
        //let msg:String;
        let email;
        var doc = new jsPDF();
        let serieId: string;
        console.log("Compruebo si el componente EmailComposer está disponible.");
        EmailComposer.isAvailable().then(
            (available)=>{

              console.log("Email composer disponible");

              console.log("Texto que voy a incluir en pdf");

              if(this.settings.serie.length>0){
                serieId=this.settings.serie + "/" + String(parte.id);
              } else {
                serieId=String(parte.id);
              }

              doc.setFontStyle('bold');
              doc.text(20,20, "Parte de Trabajo Número " + serieId);
              doc.text(20,30, "Cliente: " + parte.nombre);
              doc.text(20,40, "Fecha: " + parte.fechaformato);
              doc.text(20,50, "Horas: " + parte.horainiformato + ' a ' +parte.horafinformato);
              if(this.settings.tecnico!==null)
                doc.text(20,60, "Le atendió: " + this.settings.tecnico);
              doc.text(20,70, "Trabajo Realizado");
              doc.setFontStyle('normal');
              doc.text(20,80, doc.splitTextToSize(parte.trabajorealizado,180));

              console.log("compruebo si hay firma");
              if(parte.firma!==null){
                doc.setFontStyle('bold');
                doc.text(20,200, "Firmado por: ");
                doc.setFontStyle('normal');
                if(parte.personafirma!==null)
                  doc.text(20,210,parte.personafirma);
                console.log("añado la firma al pdf");
                doc.addImage(parte.firma,'PNG',20,220,50,50);
              }
              doc.setFontSize(8);
              let tmpText: string;
              if(this.settings.empresa!==null)
                tmpText = this.settings.empresa + "  ";
              if(this.settings.cif!==null)
                tmpText = tmpText + this.settings.cif + "  ";
              if(tmpText!="")
                doc.text(20,275,"Empresa proveedora de servicios: "+ tmpText);

              console.log("guardo el contenido del pdf (blob) en una variable");
              let pdfOutput = doc.output('blob');

              //preparamos el email según lleve o no adjunto (firma)
              if(this.platform.is("cordova")){
                console.log('Creo el pdf');
                File.writeFile(cordova.file.dataDirectory,'paretTrabajoPdf.pdf',pdfOutput,true).then(
                  (ok)=>{
                    console.log("fichero guardado");
                    email = {
                      to:      '',
                      subject: 'Parte de trabajo nº ' + serieId,
                      body:    <any>"Adjuntamos su parte de trabajo",
                      isHtml: true,
                      attachments: [cordova.file.dataDirectory+"paretTrabajoPdf.pdf"]
                    };

                    EmailComposer.open(email).then(
                        (sended)=>{
                            console.log("email enviado ");
                            this._varios.showToast("Email enviado","top");
                        },
                        (error)=>{
                            console.log("error enviando mensaje ");
                            this._varios.showToast("Se produjo un error al enviar el Email","top");
                            console.log(error);
                        }
                    );
                  },
                  (err)=>{
                    console.log("error al guardar el fichero");
                    console.log(err);
                  }
                );

                //ahora con el plugin file tocaría guardarlo
              } else {
                console.log("pdf(): cordova no disponible");
              }
            },
            (error)=>{
                console.log("Error usando EmailComposer");
                console.log("EmailComposer: ");
                console.log(EmailComposer);
            }
        );

  }


  public pdf() {
        var doc = new jsPDF();
        doc.text(20, 20, 'Hello world!');
        doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
        doc.addPage();
        doc.text(20, 20, 'Do you like that?');

        // Save the PDF
        let pdfOutput = doc.output('blob');
        console.log(pdfOutput);



        if(this.platform.is("cordova")){
          console.log('cordova está');

          File.writeFile(cordova.file.dataDirectory,'paretTrabajoPdf.pdf',pdfOutput,true).then(
            (ok)=>{
              console.log("fichero guardado");

            },
            (err)=>{
              console.log("error al guardar el fichero");
              console.log(err);
            }
          );

          //ahora con el plugin file tocaría guardarlo
        } else {
          console.log("pdf(): cordova no disponible");
        }
  }
  recuperarPdf(){
    let email;

    File.checkFile(cordova.file.dataDirectory,"paretTrabajoPdf.pdf").then(
      (ok)=>{
        console.log("fichero encontrado");
        email = {
          to:      '',
          subject: 'Parte de trabajo nº ',
          body:    "prueba envio con pdf adjunto",
          isHtml: true,
          attachments: cordova.file.dataDirectory + "paretTrabajoPdf.pdf"
        }


        EmailComposer.isAvailable().then(
            (available)=>{
                console.log("envio de email disponible");
                EmailComposer.open(email).then(
                    (sended)=>{
                        console.log("email enviado ");

                    },
                    (error)=>{
                        console.log("error enviando mensaje ");

                        console.log(error);
                    }
                );
            },
            (error)=>{
                console.log("Error usando EmailComposer");
                console.log("EmailComposer: ");
                console.log(EmailComposer);
            }
        );
      },
      (err)=>{
        console.log("fichero no encontrado");
        console.log(err);
      }
    );
  }
}
