import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlRepeatDirective } from './repeat.directive';



@NgModule({
  declarations: [
    XlRepeatDirective
  ],
  exports: [
    XlRepeatDirective
  ],
  imports: [
    CommonModule
  ]
})
export class XlRepeatModule { }
