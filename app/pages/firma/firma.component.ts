import { Component, ViewChild } from '@angular/core';
import { SignaturePad } from 'angular2-signaturepad';

 
@Component({
  selector:'firma',
  template: `
    <signature-pad [options]="signaturePadOptions" (onEndEvent)="doOnEnd()"></signature-pad>
    <ion-item><ion-input hidden fromControlModel="firma" ng-model={{firmaImg}}></ion-input></ion-item>    
    `,
  directives: [SignaturePad]
})
 
export class FirmaComponent{
 
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  public firmaImg: string;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300,
    'backgroundColor': 'silver'
  };
 
  constructor() {
    // no-op
  }
 
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  doOnEnd() {
    // will be notified of szimek/signature_pad's onEnd event
    this.firmaImg=this.signaturePad.toDataURL();
    console.log(this);
    return this.signaturePad.toDataURL();
  }
}