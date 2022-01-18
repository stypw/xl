import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlMenuSwitchComponent } from './menu-switch.component';



@NgModule({
  declarations: [
    XlMenuSwitchComponent
  ],
  exports: [
    XlMenuSwitchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class XlMenuSwitchModule { }
