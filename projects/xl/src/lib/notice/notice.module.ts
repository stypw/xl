import { NgModule } from '@angular/core';
import { XlNoticeComponent } from "./notice.component";
import { CommonModule } from '@angular/common';
import { XlSvgModule } from "../svg";
@NgModule({
  declarations: [XlNoticeComponent],
  imports: [CommonModule,XlSvgModule],
  exports: [XlNoticeComponent]
})
export class XlNoticeModule { }
