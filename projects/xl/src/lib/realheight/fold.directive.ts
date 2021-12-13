import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[xlFold]'

})
export class XlFoldDirective {
    _xlFold = false;
    @Input()
    set xlFold(v: boolean) {
        this._xlFold = v;
        if (!v) {
            this.unfold();
        } else {
            this.fold();
        }
    }

    ontransitionend() {
        console.log("end");
        const view = this.el.nativeElement as HTMLElement;
        view.style.transition = "none";
        const self = this;
        if (!self._xlFold){
            window.requestAnimationFrame(()=>{
                console.log(view.clientHeight,view.scrollHeight,view.offsetHeight);
                view.style.height = "auto";
            });
        }
    }
    async fold() {
        const self = this;
        const view = self.el.nativeElement as HTMLElement;
        view.style.transition = "none";


        window.requestAnimationFrame(() => {
            view.style.transition = "height 300ms";
            view.style.height = view.scrollHeight + "px";
            window.requestAnimationFrame(() => {
                view.style.height = "0px";
                setTimeout(()=>{self.ontransitionend()},300);
            });
        });

    }
    async unfold() {
        const self = this;

        const view = self.el.nativeElement as HTMLElement;
        view.style.transition = "none";
        window.requestAnimationFrame(() => {
            view.style.transition = "height 300ms";
            view.style.height = "0px";
            window.requestAnimationFrame(() => {
                view.style.height = view.scrollHeight + "px";
                setTimeout(()=>{self.ontransitionend()},300);
            });
        });
    }

    constructor(
        private el: ElementRef
    ) {
        const view = this.el.nativeElement as HTMLElement;
        view.style.boxSizing = "  border-box";
    }

}
