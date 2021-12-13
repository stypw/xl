import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlTreeComponent } from "./tree.component";
import { XlRealHeightModule } from "../realheight";
import { XlSvgModule } from "../svg";

@NgModule({
    declarations: [XlTreeComponent],
    imports: [CommonModule, XlSvgModule,XlRealHeightModule],
    exports: [XlTreeComponent]
})
export class XlTreeModule { }
