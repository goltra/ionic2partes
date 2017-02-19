import { ElementRef, EventEmitter } from '@angular/core';
export declare class SignaturePad {
    options: Object;
    onBeginEvent: EventEmitter<boolean>;
    onEndEvent: EventEmitter<boolean>;
    private signaturePad;
    private elementRef;
    constructor(elementRef: ElementRef);
    ngAfterContentInit(): void;
    resizeCanvas(): void;
    toDataURL(imageType?: string, quality?: number): string;
    fromDataURL(dataURL: string): void;
    clear(): void;
    isEmpty(): boolean;
    off(): void;
    on(): void;
    set(option: string, value: any): void;
    onBegin(): void;
    onEnd(): void;
}
