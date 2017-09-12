
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

declare let jsPDF;
declare var cordova: any;

@Injectable()

export class ParteService {
  private db;
  private settings: Settings;
  private dirFiles: string;

  constructor(private _varios: VariosService, _db: DatabaseProvider, private platform: Platform, private s: SettingsService, private emailComposer: EmailComposer, private socialSharing: SocialSharing, private file: File) {

    this.db = _db
    this.dirFiles = "";
    console.log("constructor ParteService");
   /* this.db.query('CREATE TABLE IF NOT EXISTS parte (id INTEGER PRIMARY KEY AUTOINCREMENT, clienteid INTEGER CONSTRAINT fk_clienteid REFERENCES cliente (id) ON DELETE CASCADE ON UPDATE SET DEFAULT, fecha DATE NOT NULL, horaini TIME NOT NULL, horafin TIME NOT NULL, trabajorealizado TEXT, personafirma TEXT, firma TEXT);').then(
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
    );*/

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

  /*generarPdf(parte: Parte) {
    console.log("Entro a generar el PDF");
 
     let descripcionShare: string;
     let asuntoShare: string;
     let nombrePdf: string;
     let numParte = parte.id; // AQUÍ DEBERÍA IR EL NUMERO DE PARTE, PERO MIENTRAS Y PARA PRUEBAS ESTOY PONIENDO LA ID //
   
     let alturaExtra=0;
     if(parte.firma!= ''){
         alturaExtra = 30;
     } 
 

    descripcionShare = "hola"+'\n'+"Adjunto envío el parte de trabajo Nº "+numParte+"\n"+"¡Un cordial saludo!";
      

    asuntoShare = "Parte de trabajo Nº "+numParte;

     nombrePdf = parte+"_"+numParte+".pdf";
                
   
   
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
     partepdf.text(110, 25, parte.cliente_empresa);
     partepdf.text(110, 30, parte.cliente_direccion);
     partepdf.text(110, 35, parte.cliente_localidad);
     partepdf.text(110, 40, parte.cliente_provincia);
     partepdf.text(110, 45, parte.cliente_cif);
     partepdf.text(110, 50, "666 666 666"); // Pediente implementar
     console.log("Cabecera generada");
     // FIN CABECERA //
     
     //ACTUACION//
     console.log("Generando área de actuacion...");
     partepdf.text("ACTUACIÓN", 105, 60, 'center');
     partepdf.line(10, 63, 200, 63); // Linea horizontal
     partepdf.setFontType('bold');
     partepdf.text(20, 70, "Trabajador:");
     partepdf.text(20, 78, "Hora de inicio:");
     partepdf.text(110, 78, "Hora de fin:");
     partepdf.text(20, 83, "Fecha:");
     partepdf.text(110, 83, "Total horas:");
     partepdf.text(20, 93, "Trabajo solicitado");
     partepdf.setFontType('normal');
 
     partepdf.text(50, 70, "Nombre Apellido1 Apellido2"); // Pendiente implementar
     partepdf.text(50, 78, this.parte.horaIni+"h.");
     partepdf.text(140, 78, this.parte.horaFin+"h.");
     partepdf.text(50, 83, this.parte.fechaFormato);
 
     // this.calcularMinutos().then(data => { 
     //   console.log("MINUTOS TOTALES DEL PARTE -> "+data);
     //   let horas = data/60;
     //   console.log("HORAS DEL PARTE -> "+horas);
     //   partepdf.text(140, 83, horas+" horas"); // Pendiente implementar
     // });
     
 
     var splitNotas = partepdf.splitTextToSize(this.parte.trabajoSolicitado, 170);
     partepdf.text(splitNotas, 20, 100);
     console.log("Área de actuación generada");
     //FIN ACTUACION//
 
     let lineasTrabajoSol = this.parte.trabajoSolicitado.length/95;
     let alturaTrabajoSol = lineasTrabajoSol *5;
     lineaActual = 100+alturaTrabajoSol;
     console.log("LINEA ACTUAL -> "+lineaActual);
 
    //ACTUACIONES//
    if(this.actuaciones.length!=0){
      console.log("Generando actuaciones...");
       partepdf.text("ACTUACIONES", 105, lineaActual+10, 'center');
       partepdf.line(10, lineaActual+13, 200, lineaActual+13); // Linea horizontal
       partepdf.setFontType('bold');
       partepdf.text("N.", 20, lineaActual+20, 'center');
       partepdf.text(35, lineaActual+20,"Descripción");
       partepdf.text(120, lineaActual+20,"Notas");
       partepdf.setFontType('normal');
       partepdf.setLineWidth(0.5); // Aumento grosor de linea horizontal
       partepdf.line(20, lineaActual+23, 190, lineaActual+23); // Linea horizontal
       
       lineaActual = lineaActual + 23; // Actualizo la linea actual
       partepdf.setLineWidth(0.1); // Disminuyo grosor de la linea horizontal
   
       console.log("Numero de actuaciones -> "+this.actuaciones.length);
   
       for(var i=0;i<this.actuaciones.length;i++) {
         let descripcionActuacion = this.actuaciones[i].descripcion;
         let lineasDescActuacion = descripcionActuacion.length/45;
         let notasActuacion = this.actuaciones[i].notas;
         let lineasNotasActuacion = notasActuacion.length/43;
         let alturaActuacion;
         if(lineasDescActuacion>lineasNotasActuacion){ // Esto es por si las notas ocupan mas que la descripcion
             alturaActuacion  = lineasDescActuacion *4;
         } else{
                 alturaActuacion = lineasNotasActuacion *4;
         } 
       console.log("Calculada la altura de la actuacion -> "+alturaActuacion);
         if((alturaActuacion+lineaActual)<(220+alturaExtra)){ // Compruebo que cojan en la página
             console.log("Decido no saltar la pagina porque la altura va a ser -> "+(alturaActuacion+lineaActual));
             partepdf.text((i+1).toString(), 20, lineaActual+7, 'center');
             var splitDescActuacion = partepdf.splitTextToSize(descripcionActuacion, 75);
             partepdf.text(splitDescActuacion, 35, lineaActual+7);
             // cada 35 es una linea
             var splitNotasActuacion = partepdf.splitTextToSize(notasActuacion, 70);
             partepdf.text(splitNotasActuacion, 120, lineaActual+7);
             // cada 35 es una linea    
             lineaActual = lineaActual + alturaActuacion+ 10; // Actualizo valor de la linea actual
             partepdf.line(20, lineaActual, 190, lineaActual); // Linea horizontal
             } else{ // Si no cogen en la página, añado una nueva
                   console.log("SALTOO la pagina porque la altura va a ser -> "+(alturaActuacion+lineaActual));
                   partepdf.addPage(); // Añado página
                   lineaActual = 5; // Actualizo la linea actual
                   
                   // AÑADO LA CABECERA DE ACTUACIONES//
                   partepdf.text("ACTUACIONES", 105, lineaActual+10, 'center');
                   partepdf.line(10, lineaActual+13, 200, lineaActual+13); // Linea horizontal
                   partepdf.setFontType('bold');
                   partepdf.text("N.", 20, lineaActual+20, 'center');
                   partepdf.text(50, lineaActual+20,"Descripción");
                   partepdf.text(150, lineaActual+20,"Notas");
                   partepdf.setFontType('normal');
                   partepdf.setLineWidth(0.5); // Aumento grosor de linea horizontal
                   partepdf.line(20, lineaActual+23, 190, lineaActual+23); // Linea horizontal
                   
                   lineaActual = lineaActual + 23; // Actualizo la linea actual
                   partepdf.setLineWidth(0.1); // Disminuyo grosor de la linea horizontal
       
                   // AÑADO ACTUACIONES PENDIENTES //
                   partepdf.text((i+1).toString(), 20, lineaActual+7, 'center');
                   var splitDescActuacion = partepdf.splitTextToSize(descripcionActuacion, 75);
                   partepdf.text(splitDescActuacion, 35, lineaActual+7);
                   // cada 35 es una linea
                   var splitNotasActuacion = partepdf.splitTextToSize(notasActuacion, 70);
                   partepdf.text(splitNotasActuacion, 120, lineaActual+7);
                   // cada 35 es una linea    
                   lineaActual = lineaActual + alturaActuacion+ 10; // Actualizo valor de la linea actual
                   partepdf.line(20, lineaActual, 190, lineaActual); // Linea horizontal
                   }    
       }
   
       console.log("Actuaciones generadas");
    }
     // FIN ACTUACIONES //
 
     //PRODUCTOS//
     if(this.lineasProducto.length!=0){
       console.log("Generando lineas de productos...");
       partepdf.text("PRODUCTOS", 105, lineaActual+10, 'center');
       partepdf.line(10, lineaActual+13, 200, lineaActual+13); // Linea horizontal
       partepdf.setFontType('bold');
       partepdf.text(20, lineaActual+20,"Descripción");
       partepdf.text("Uds", 120, lineaActual+20, 'center');
       partepdf.text("Precio/ud", 150, lineaActual+20, 'center');
       partepdf.text("Total", 185, lineaActual+20, 'center');
       partepdf.setFontType('normal');
       partepdf.setLineWidth(0.5); // Aumento grosor de linea horizontal
       partepdf.line(20, lineaActual+23, 190, lineaActual+23); // Linea horizontal
       
       lineaActual = lineaActual + 23; // Actualizo la linea actual
       partepdf.setLineWidth(0.1); // Disminuyo grosor de la linea horizontal
   
       console.log("Numero de productos -> "+this.lineasProducto.length);
       var totalPrecio = 0;
       for(var i=0;i<this.lineasProducto.length;i++) {
         let descripcionProducto = this.lineasProducto[i].descripcion;
         let lineasDescProduct = descripcionProducto.length/45;
         let alturaDescProduct = lineasDescProduct *4;
   
         if((alturaDescProduct+lineaActual)<(220+alturaExtra)){ // Compruebo que cojan en la página
           console.log("Decido no saltar la pagina porque la altura va a ser -> "+(alturaDescProduct+lineaActual));
             var splitDescProduct = partepdf.splitTextToSize(descripcionProducto, 80);
             partepdf.text(splitDescProduct, 20, lineaActual+7);
             // cada 35 es una linea
             partepdf.text((this.lineasProducto[i].unidades).toString(), 120, lineaActual+7, 'center');
             partepdf.text((this.lineasProducto[i].precioUnitario).toString(), 150, lineaActual+7, 'center' );
             partepdf.text((this.lineasProducto[i].unidades*this.lineasProducto[i].precioUnitario).toString(), 185, lineaActual+7, 'center');
             lineaActual = lineaActual + alturaDescProduct + 10; // Actualizo valor de la linea actual
             partepdf.line(20, lineaActual, 190, lineaActual); // Linea horizontal
             totalPrecio = totalPrecio + (this.lineasProducto[i].unidades*this.lineasProducto[i].precioUnitario); // Actualizo el total
             } else{ // Si no cogen en la página, añado una nueva
                   console.log("SALTOO la pagina porque la altura va a ser -> "+(alturaDescProduct+lineaActual));
                   partepdf.addPage(); // Añado página
                   lineaActual = 5; // Actualizo la linea actual
                   
                   // AÑADO LA CABECERA DE PRODUCTOS//
                   partepdf.text("PRODUCTOS", 105, lineaActual+10, 'center');
                   partepdf.line(10, lineaActual+13, 200, lineaActual+13); // Linea horizontal
                   partepdf.setFontType('bold');
                   partepdf.text(20, lineaActual+20,"Descripción");
                   partepdf.text("Uds", 120, lineaActual+20, 'center');
                   partepdf.text("Precio/ud", 150, lineaActual+20, 'center');
                   partepdf.text("Total", 185, lineaActual+20, 'center');
                   partepdf.setFontType('normal');
                   partepdf.setLineWidth(0.5); // Aumento grosor de linea horizontal
                   partepdf.line(20, lineaActual+23, 190, lineaActual+23); // Linea horizontal
                   
                   lineaActual = lineaActual + 23; // Actualizo la linea actual
                   partepdf.setLineWidth(0.1); // Disminuyo grosor de la linea horizontal
       
                   // AÑADO PRODUCTOS PENDIENTES //
                   var splitDescProduct = partepdf.splitTextToSize(descripcionProducto, 80);
                   partepdf.text(splitDescProduct, 20, lineaActual+7);
                   partepdf.text((this.lineasProducto[i].unidades).toString(), 120, lineaActual+7, 'center');
                   partepdf.text((this.lineasProducto[i].precioUnitario).toString(), 150, lineaActual+7, 'center' );
                   partepdf.text((this.lineasProducto[i].unidades*this.lineasProducto[i].precioUnitario).toString(), 185, lineaActual+7, 'center');
                   lineaActual = lineaActual + alturaDescProduct + 10; // Actualizo valor de la linea actual
                   partepdf.line(20, lineaActual, 190, lineaActual); // Linea horizontal
                   totalPrecio = totalPrecio + (this.lineasProducto[i].unidades*this.lineasProducto[i].precioUnitario); 
               }    
       }
   
       if(this.lineasProducto.length>0){
         partepdf.setFontType('bold');
         partepdf.text("Total", 160, lineaActual+7, 'center');
         partepdf.text((totalPrecio).toString(), 185, lineaActual+7, 'center');
         partepdf.setFontType('normal');
       }
       console.log("Lineas de productos generadas");
     }
     // FIN PRODUCTOS //
 
     // OBSERVACIONES //
     if(this.parte.notas!='' || this.parte.notas!=undefined){
       let lineasObservaciones = this.parte.notas.length/95;
       let alturaObservaciones = (lineasObservaciones *5)+5; // El +5 final es por tener en cuenta la altura de la palabra "Observaciones"
       if((alturaObservaciones+lineaActual)>(220+alturaExtra)){
            console.log("SALTOO la pagina porque la altura va a ser -> "+(alturaObservaciones + lineaActual));
            partepdf.addPage(); // Añado página
            lineaActual = 5; // Actualizo la linea actual
       } else{
         console.log("Decido NO saltar porque la altura va a ser -> "+(alturaObservaciones + lineaActual));
       }
   
       partepdf.setFontType('bold');
       partepdf.text(20, (lineaActual+15), "Observaciones:");
       partepdf.setFontType('normal');
       var splitNotas = partepdf.splitTextToSize(this.parte.notas, 170);
       partepdf.text(splitNotas, 20, (lineaActual+20));
     }
     // FIN OBSERVACIONES //
 
     // FOOTER //
   console.log("Generando footer...");
     for(var i=1;i<=+partepdf.internal.getNumberOfPages();i++) {
       console.log("Cambio a la pagina -> "+i);
       partepdf.setPage(i);
       partepdf.text("Empresa, S.A. - B55555555 - C/Falsa, 123", 105, 265, 'center');  
       partepdf.text("00000 - Pueblo (Provincia)", 105, 270, 'center');   
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
     if(this.parte.firma!= ''){
     partepdf.addImage(this.parte.firma, 'PNG', 20, 225, 51, 30);
     partepdf.text("Fdo. Nombre Apellido1 Apellido2", 20, 255); // Cuando se implemente la persona firmate hay que tener en cuenta que si no se pone no se muestre
     } else{
       console.log("No hay firma de cliente");
     }
   console.log("Footer generado con éxito");
     // FIN FOOTER //
      console.log("Guardo el contenido del pdf (blob) en una variable");
      
     this.calcularMinutos().then(data => { 
       console.log("MINUTOS TOTALES DEL PARTE -> "+data);
       let horas = data/60;
       console.log("HORAS DEL PARTE -> "+horas);
       
       partepdf.setFontType('normal');
       partepdf.setFontSize(10);
       partepdf.setPage(1);
       partepdf.text(140, 83, horas+" h."); // Pendiente implementar
     
      
      let pdfOutput = partepdf.output('blob');
      
      console.log('Creo el pdf');
              if (this.platform.is('cordova')) {
               this.file.writeFile(this.dirFiles, nombrePdf, pdfOutput, { replace: true }).then(
                 (ok) => {
                   console.log("Fichero guardado en " + this.dirFiles);
                   console.log(ok); 
                 });
                
                 // You are on a device, cordova plugins are accessible
                   this.socialSharing.share(descripcionShare, asuntoShare, this.dirFiles + nombrePdf);
                     } else {
                           // Cordova not accessible, add mock data if necessary
                          //window.open(this.dirFiles + nombrePdf);
                          //partepdf.output("dataurlnewwindow");
                          partepdf.save(nombrePdf);
                         }
          });   
    
   }
*/
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

