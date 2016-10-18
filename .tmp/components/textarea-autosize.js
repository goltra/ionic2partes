import { Directive, ElementRef, Renderer, HostListener } from '@angular/core';
export var TextareaAutosize = (function () {
    function TextareaAutosize(element, render) {
        this.element = element;
        this.render = render;
    }
    TextareaAutosize.prototype.onInput = function (nativeElement) {
        nativeElement.style.height = 'auto';
        nativeElement.style.height = nativeElement.scrollHeight + "px";
        console.log('textareaautosize.input');
        console.log(nativeElement);
    };
    TextareaAutosize.prototype.onLoad = function (nativeElement) {
        nativeElement.style.height = 'auto';
        nativeElement.style.height = nativeElement.scrollHeight + "px";
        console.log('textareaautosize.input');
        console.log(nativeElement);
    };
    TextareaAutosize.prototype.ngAfterViewInit = function () {
        // this.el = this.element.nativeElement.querySelector('textarea'); //I have checked without querySelector too
        // console.log(this.element.nativeElement.style); //this return CSSStyleDeclaration with all empty properties 
        // console.log(this.el.scrollHeight); //this return always 0
        // console.log(this.el); //this return the html textarea code
        // this.render.setElementStyle(this.el, 'height', 100 + 'px'); //this set height to 100px
    };
    TextareaAutosize.decorators = [
        { type: Directive, args: [{
                    selector: '[textarea-autosize]',
                },] },
    ];
    /** @nocollapse */
    TextareaAutosize.ctorParameters = [
        { type: ElementRef, },
        { type: Renderer, },
    ];
    TextareaAutosize.propDecorators = {
        'onInput': [{ type: HostListener, args: ['input', ['$event.target'],] },],
        'onLoad': [{ type: HostListener, args: ['click', ['$event.target'],] },],
    };
    return TextareaAutosize;
}());
