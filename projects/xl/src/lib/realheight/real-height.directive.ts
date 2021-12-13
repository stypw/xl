import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { sleep } from '../tools';

@Directive({
  selector: '[xlRealHeight]'
})
export class XlRealHeightDirective {

  

  async ngAfterViewInit(){
    await sleep(50);
    const view = this.el.nativeElement as HTMLElement;
    view.style.maxHeight = view.scrollHeight+"px";
  }


  constructor(
    private el: ElementRef
  ) { }

}
