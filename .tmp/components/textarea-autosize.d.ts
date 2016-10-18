import { ElementRef, Renderer } from '@angular/core';
export declare class TextareaAutosize {
    private element;
    private render;
    onInput(nativeElement: any): void;
    onLoad(nativeElement: any): void;
    private el;
    constructor(element: ElementRef, render: Renderer);
    ngAfterViewInit(): void;
}
