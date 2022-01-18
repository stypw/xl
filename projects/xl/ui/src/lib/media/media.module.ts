import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlMediaDirective } from './media.directive';



@NgModule({
  declarations: [
    XlMediaDirective
  ],
  exports: [
    XlMediaDirective
  ],
  imports: [
    CommonModule
  ]
})
export class XlMediaModule { }
