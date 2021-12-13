import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlToggleItemDirective } from "./toggle-item.directive";
import { XlToggleComponent } from "./toggle.component";
@NgModule({
    declarations: [XlToggleItemDirective, XlToggleComponent],
    imports: [CommonModule],
    exports: [XlToggleItemDirective, XlToggleComponent]
})
export class XlToggleModule { }
