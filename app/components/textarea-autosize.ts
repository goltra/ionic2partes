import {Directive, ElementRef, Renderer,HostListener} from '@angular/core';
@Directive({
    selector: '[textarea-autosize]',
})

export class TextareaAutosize{

    @HostListener('input',['$event.target'])
    onInput(nativeElement: any): void {
        nativeElement.style.height='auto';
        nativeElement.style.height = nativeElement.scrollHeight + "px";
        console.log('textareaautosize.input');
        console.log(nativeElement);
    }
    @HostListener('click',['$event.target'])
    onLoad(nativeElement: any): void{
         nativeElement.style.height='auto';
        nativeElement.style.height = nativeElement.scrollHeight + "px";
        console.log('textareaautosize.input');
        console.log(nativeElement);
    }
    private el: HTMLElement;
    constructor(private element:ElementRef, private render:Renderer){
        


    }
    ngAfterViewInit(){
        
        // this.el = this.element.nativeElement.querySelector('textarea'); //I have checked without querySelector too
        // console.log(this.element.nativeElement.style); //this return CSSStyleDeclaration with all empty properties 
        // console.log(this.el.scrollHeight); //this return always 0
        // console.log(this.el); //this return the html textarea code
        // this.render.setElementStyle(this.el, 'height', 100 + 'px'); //this set height to 100px
    }
}