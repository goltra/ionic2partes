import {Injectable} from '@angular/core';
import {Platform} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import {Parte} from '../model/parte';
import {VariosService} from './varios.service';
import {EmailComposer, File} from 'ionic-native';
import { DatabaseProvider } from '../provider/database.provider';
declare let jsPDF;
declare var cordova: any;

@Injectable()

export class ParteService{
    private storage:any;
    private db;

    constructor(private _varios: VariosService, _db:DatabaseProvider, private platform: Platform){

        this.db = _db

        this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
                    (data)=>{

                    },
                    (error)=>{console.log("Error al crear la tabla parte: " + error.err.message)}
                );

    }

    listaPartes(){
        let sql:string;
        sql = 'Select parte.*, cliente.nombre, cliente.telefono from parte inner join cliente on clienteid=cliente.id';
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
        let msg:String;
        let email;
        var doc = new jsPDF();

        msg = "<h1><strong>Parte de Trabajo número:</strong> " + parte.id +"</h1>";
        msg+="<h2><strong>Cliente: </strong>" + parte.nombre + '</h2>';
        msg+="<p><strong>Fecha:</strong> " + parte.fechaformato + '</p>';
        msg+="<p><strong>Horas:</strong> " + parte.horainiformato + ' a ' + parte.horafinformato + '</p>';
        msg+="<p>" + parte.trabajorealizado + '</p>';
        msg+="<hr>";
        msg+="<p><strong>Firmado: </strong>" +  parte.personafirma + "</p>";
        console.log("Se va a enviar el siguiente mensaje: " + msg);
        console.log("Compruebo si el componente EmailComposer está disponible.");


        EmailComposer.isAvailable().then(
            (available)=>{
              console.log("Email composer disponible");

              console.log("Texto que voy a incluir en pdf");
              doc.text(20,20, "Parte de Trabajo Número " + parte.id);
              doc.text(20,30, "Cliente: " + parte.nombre);
              doc.text(20,40, "Fecha: " + parte.fechaformato);
              doc.text(20,50, "Horas: " + parte.horainiformato + ' a ' +parte.horafinformato);
              doc.text(20,60, "Trabajo Realizado");
              doc.text(20,70, doc.splitTextToSize(parte.trabajorealizado,180));

              console.log("compruebo si hay firma");
              if(parte.firma!==null){
                doc.text(20,220, "Firmado por: ");
                doc.text(20,230,parte.personafirma);
                console.log("añado la firma al pdf");
                doc.addImage(parte.firma,'PNG',20,240,50,50);
              }
              console.log("guardo el contenido del pdf (blob) en una variable");
              let pdfOutput = doc.output('blob');

              //preparamos el email según lleve o no adjunto (firma)
              if(this.platform.is("cordova")){
                console.log('Creo el pdf');
                File.writeFile(cordova.file.dataDirectory,'tmpPdf.pdf',pdfOutput,true).then(
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

              if(parte.firma!==null){
                console.log("El parte tiene firma y lo agrego como adjunto")
                email = {
                  to:      '',
                  subject: 'Parte de trabajo nº ' + parte.id,
                  body:    <any>msg,
                  isHtml: true,
                  attachments: [parte.firmaBase64, cordova.file.dataDirectory+"tmpPdf.pdf"]
                };
              } else {
                console.log("el parte no tiene firma de modo que no lleva adjunto");
                email = {
                  to:      '',
                  subject: 'Parte de trabajo nº ' + parte.id,
                  body:    <any>msg,
                  isHtml: true
                };
              }

              console.log("envio de email disponible");
              EmailComposer.open(email).then(
                  (sended)=>{
                      console.log("email enviado ");
                      this._varios.showToast("Email enviado","top");
                  },
                  (error)=>{
                      console.log("error enviando mensaje ");
                      this._varios.showToast("Se producjo un error al enviar el Email o","top");
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

          File.writeFile(cordova.file.dataDirectory,'tmpPdf.pdf',pdfOutput,true).then(
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

    File.checkFile(cordova.file.dataDirectory,"tmpPdf.pdf").then(
      (ok)=>{
        console.log("fichero encontrado");
        email = {
          to:      '',
          subject: 'Parte de trabajo nº ',
          body:    "prueba envio con pdf adjunto",
          isHtml: true,
          attachments: cordova.file.dataDirectory + "tmpPdf.pdf"
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
