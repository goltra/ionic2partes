
export class Settings{

  public serie: string;
  public empresa: string;
  public direccion: string;
  public localidad: string;
  public provincia: string;
  public cp: string;
  public cif: string;
  public email: string;
  public tecnico: string;
  public imagen: string;
  public imagenBase64: string;

  contructor(){
      this.imagen = "";
      this.imagenBase64 = "";
  }
  /** Devuelve el objeto del tipo Settings recibiendo un objeto generico */
  static inicializa(values:Object): Settings {
      // console.log("parte.inicializa");
      // console.log(values);
      try {
          let setting= new Settings();
          // console.log("parte inicializado a null")

          for(let p in values){
              if(Object.getOwnPropertyDescriptor(values, p)!=undefined ){
                 setting[p] = values[p];
              }
          }
          // console.log("parte despues del for")
          // console.log(parte);
          return setting;
      } catch (error) {
          alert ("Settings.inicializa " + error);
          return null;
      }
  }
  get nombreCompleto(): string{
    return this.empresa + ' - ' + this.cif;
  }
  
}
