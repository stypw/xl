import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SvgComponent } from './svg.component';



@NgModule({
  declarations: [SvgComponent],
  exports: [SvgComponent],
  imports: [CommonModule]
})
export class XlSvgModule { }
