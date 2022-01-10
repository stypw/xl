import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlEventOnceDirective } from './event-once.directive';



@NgModule({
  declarations: [
    XlEventOnceDirective
  ],
  exports:[
    XlEventOnceDirective
  ],
  imports: [
    CommonModule
  ]
})
export class XlEventOnceModule { }
