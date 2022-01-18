import { Directive, ElementRef } from '@angular/core';
import { nextFrame } from "@stypw/xl/core";
@Directive({
    selector: '[xlFold]',
    inputs: ["xlFold", "duration"],
    host: {
        "[style.transition-duration]": "duration",
        "[style.overflow]": "'hidden'",
        "[style.height]": "'auto'",
        "[style.box-sizing]": "'border-box'",
        "(transitionend)": "ontransitionend();"
    }
})
export class XlFoldDirective {
    _xlFold = false;

    set xlFold(v: boolean) {
        this._xlFold = v;
        if (!this.inited) return;
        if (!v) {
            this.unfold();
        } else {
            this.fold();
        }
    }

    duration = "300ms";

    ontransitionend() {
        const view = this.el.nativeElement as HTMLElement;
        view.style.transitionProperty = "none";
        
        if (!this._xlFold) {
            view.style.maxHeight = "none";
        }
    }
    async fold() {
        const view = this.el.nativeElement as HTMLElement;
        view.style.transitionProperty = "none";

        await nextFrame();
        view.style.transitionProperty = "max-height";
        view.style.maxHeight = view.scrollHeight + "px";

        await nextFrame();
        view.style.maxHeight = "0px";
    }
    async unfold() {
        const view = this.el.nativeElement as HTMLElement;
        view.style.transitionProperty = "none";

        await nextFrame();
        view.style.transitionProperty = "max-height";
        view.style.maxHeight = "0px";

        await nextFrame();
        view.style.maxHeight = view.scrollHeight + "px";
    }

    inited = false;
    async ngAfterViewInit() {
        await nextFrame();
        if (!this._xlFold) {
            await this.unfold();
        } else {
            await this.fold();
        }
        this.inited = true;
    }

    constructor(private el: ElementRef) { }
}
