import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlAnchorComponent } from './anchor/anchor.component';
import { XlAnchorGroupComponent } from './anchor-group/anchor-group.component';



@NgModule({
  declarations: [
    XlAnchorComponent,
    XlAnchorGroupComponent
  ],
  exports: [
    XlAnchorComponent,
    XlAnchorGroupComponent
  ],
  imports: [
    CommonModule
  ]
})
export class XlAnchorModule { }
