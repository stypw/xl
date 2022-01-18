import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlToastComponent } from "./toast.component";
@NgModule({
    declarations: [XlToastComponent],
    imports:[CommonModule],
    exports: [XlToastComponent]
})
export class XlToastModule { }
