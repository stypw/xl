import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[xlEventOnce]'
})
export class XlEventOnceDirective {

  @Output()
  click = new EventEmitter<void>();

  @HostListener("click",["$event"])
  onClick(evt:Event){
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    this.click.emit();
  }

  

}
