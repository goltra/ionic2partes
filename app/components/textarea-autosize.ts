import {Directive, ElementRef, Renderer} from '@angular/core';


@Directive({
    selector: '[textarea-autosize]',
})

export class TextareaAutosize{

    private height;
    private el: HTMLElement;
    constructor(private element:ElementRef, private render:Renderer){
        


    }
    ngAfterViewInit(){
        
        //this.render.setElementStyle(this.el, 'height', this.height + 'px');
    }
    ngOnInit(){
        this.el = this.element.nativeElement.querySelector('textarea');
        console.log(this.element.nativeElement.style);
        console.log(this.el.scrollHeight);
        console.log(this.el);
        
    }
 
}