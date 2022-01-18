import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlPaggerComponent } from './pagger.component';



@NgModule({
  declarations: [
    XlPaggerComponent
  ],
  exports:[
    XlPaggerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class XlPaggerModule { }
