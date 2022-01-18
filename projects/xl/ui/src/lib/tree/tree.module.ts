import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlTreeComponent } from "./tree.component";
import { XlFoldModule } from "../fold";
import { XlSvgModule } from "../svg";

@NgModule({
    declarations: [XlTreeComponent],
    imports: [CommonModule, XlSvgModule,XlFoldModule],
    exports: [XlTreeComponent]
})
export class XlTreeModule { }
