import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlColorpickerComponent } from './colorpicker.component';
import { XlSilderModule } from "../slider";
import { XlBindingModule } from "../binding";



@NgModule({
  declarations: [
    XlColorpickerComponent
  ],
  exports: [XlColorpickerComponent],
  imports: [
    XlBindingModule,
    XlSilderModule,
    CommonModule
  ]
})
export class XlColorpickerModule { }
