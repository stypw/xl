import { Directive, ElementRef, Input, Optional, Self, TemplateRef, ViewContainerRef } from "@angular/core";

export interface IXlBinding {
    readonly nativeElement: HTMLElement | null;
    readonly element: HTMLElement | null;
    readonly template: TemplateRef<any> | null;
    readonly vcr: ViewContainerRef | null;
}

class XlBinding implements IXlBinding {
    nativeElement: HTMLElement | null = null;
    element: HTMLElement | null = null;
    template: TemplateRef<any> | null = null;
    vcr: ViewContainerRef | null = null;
}
export namespace IXlBinding {
    export function create(): IXlBinding {
        return new XlBinding();
    }
}

@Directive({
    selector: '[xlBinding]'
})
export class XlBindingDirective {
    @Input()
    set xlBinding(val: IXlBinding) {
        if (!val) return;
        const v = val as XlBinding;
        if (!v) return;

        v.element = this.el?.nativeElement;
        v.nativeElement = this.el?.nativeElement;
        v.template = this.template;
        v.vcr = this.vcr;
    }
    constructor(
        @Optional() @Self() private el: ElementRef,
        @Optional() @Self() private template: TemplateRef<any>,
        @Optional() @Self() private vcr: ViewContainerRef
    ) { }
}
