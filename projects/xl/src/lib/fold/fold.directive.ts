import { Directive, ElementRef } from '@angular/core';
@Directive({
    selector: '[xlFold]',
    inputs: ["xlFold","duration"],
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
        if (!v) {
            this.unfold();
        } else {
            this.fold();
        }
    }

    duration = "300ms";

    ontransitionend() {
        const view = this.el.nativeElement as HTMLElement;
        const self = this;
        view.style.transitionProperty = "none";
        if (!self._xlFold) {
            window.requestAnimationFrame(() => {
                view.style.maxHeight = "none";
            });
        }
    }
    async fold() {
        const self = this;
        const view = self.el.nativeElement as HTMLElement;
        view.style.transitionProperty = "none";


        window.requestAnimationFrame(() => {
            view.style.transitionProperty = "max-height";
            view.style.maxHeight = view.scrollHeight + "px";
            window.requestAnimationFrame(() => {
                view.style.maxHeight = "0px";
            });
        });

    }
    async unfold() {
        const self = this;

        const view = self.el.nativeElement as HTMLElement;
        view.style.transitionProperty = "none";
        window.requestAnimationFrame(() => {
            view.style.transitionProperty = "max-height";
            view.style.maxHeight = "0px";
            window.requestAnimationFrame(() => {
                view.style.maxHeight = view.scrollHeight + "px";
            });
        });
    }

    constructor(private el: ElementRef) { }
}
