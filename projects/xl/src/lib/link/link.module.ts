import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlLinkComponent } from './link.component';



@NgModule({
  declarations: [
    XlLinkComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    XlLinkComponent
  ]
})
export class XlLinkModule { }
