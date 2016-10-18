import { Component, ViewChild } from '@angular/core';
import { Parte } from '../../model/parte';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { ParteService } from '../../service/parte.service';
import { VariosService } from '../../service/varios.service';
import { ParteListComponent } from './parte-list.component';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
export var ParteEditarComponent = (function () {
    function ParteEditarComponent(_nav, _navParams, fb, parteService, _varios) {
        this._nav = _nav;
        this._navParams = _navParams;
        this.fb = fb;
        this.parteService = parteService;
        this._varios = _varios;
        this.signaturePadOptions = {
            'minWidth': 5,
            'canvasWidth': 500,
            'canvasHeight': 300,
            'backgroundColor': 'silver'
        };
        var params = _navParams;
        this.parte = new Parte();
        var clienteid;
        console.log(this.signaturePad);
        if (!isNaN(Number(params.get('clienteid')))) {
            //este caso siempre se debe dar cuando se trata de un nuevo parte.
            this.nuevo = true;
            clienteid = params.get('clienteid');
            this.parte.clienteid = clienteid;
            this.parte.fecha = _varios.getNowDateIso();
            this.parte.horaini = this.parte.fecha;
            this.parte.horafin = this.parte.fecha;
        }
        else {
            this.nuevo = false;
            this.parte = Parte.inicializa(params.data[0]);
            console.log("Editando parte con id " + this.parte.id);
        }
        this.myForm = this.fb.group({
            'id': [this.parte.id],
            'clienteid': [this.parte.clienteid],
            'fecha': [this.parte.fecha],
            'horaini': [this.parte.horaini],
            'horafin': [this.parte.horafin],
            'trabajorealizado': [this.parte.trabajorealizado],
            'personafirma': [this.parte.personafirma],
            'firma': [this.parte.firma],
        });
    }
    // ionViewDidEnter() {
    //     let canvas        = document.getElementById('signature-pad');
    //     this.signaturePad = new SignaturePad(canvas);
    // }
    ParteEditarComponent.prototype.cancelar = function () {
        this._nav.pop();
    };
    ParteEditarComponent.prototype.countRows = function (e) {
        console.log(e);
        //    let numLineas=e.target.value.split("\n").length;
        //    e.target.style.height='auto';
        //    e.target.style.height = e.target.scrollHeight + 'px';
        //    console.log(e.target.scrollHeight);
    };
    ParteEditarComponent.prototype.onSubmit = function () {
        var f = this.myForm.value;
        console.log(this.myForm.value);
        this.parteService.actualizaParte(f);
        this._nav.setRoot(ParteListComponent);
    };
    ParteEditarComponent.prototype.ngAfterViewInit = function () {
        // this.signaturePad is now available
        this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
        this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
        if (this.parte.firma !== null) {
            this.signaturePad.fromDataURL(this.parte.firma);
            this.firmaImg = this.parte.firma;
            console.log("asignar firma guardada a canvas");
        }
    };
    ParteEditarComponent.prototype.doOnEnd = function () {
        // will be notified of szimek/signature_pad's onEnd event
        this.firmaImg = this.signaturePad.toDataURL();
        this.myForm.value.firma = this.firmaImg;
    };
    ParteEditarComponent.prototype.aceptaFirma = function () {
        this.doOnEnd();
    };
    ParteEditarComponent.decorators = [
        { type: Component, args: [{
                    templateUrl: 'parte-editar.component.html',
                },] },
    ];
    /** @nocollapse */
    ParteEditarComponent.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: FormBuilder, },
        { type: ParteService, },
        { type: VariosService, },
    ];
    ParteEditarComponent.propDecorators = {
        'signaturePad': [{ type: ViewChild, args: [SignaturePad,] },],
    };
    return ParteEditarComponent;
}());
