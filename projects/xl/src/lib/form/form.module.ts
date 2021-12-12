import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlSvgModule } from "../svg";
import { XlBindingModule } from "../binding";
import { XlClearInputComponent } from './clear-input/clear-input.component';



@NgModule({
  declarations: [
    XlClearInputComponent
  ],
  exports: [
    XlClearInputComponent
  ],
  imports: [
    XlBindingModule,
    XlSvgModule,
    CommonModule
  ]
})
export class XlFormModule { }
