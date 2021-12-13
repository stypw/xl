import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlTreeComponent } from "./tree.component";
import { XlSvgModule } from "../svg";
@NgModule({
    declarations: [XlTreeComponent],
    imports: [CommonModule, XlSvgModule],
    exports: [XlTreeComponent]
})
export class XlTreeModule { }
