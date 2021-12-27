import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlRecursionDirective } from './recursion.directive';



@NgModule({
  declarations: [
    XlRecursionDirective
  ],
  exports: [
    XlRecursionDirective
  ],
  imports: [
    CommonModule
  ]
})
export class XlRecursionModule { }
