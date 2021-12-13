import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlToggleModule } from "../toggle";
import { XlTabItemComponent } from "./tab-item/tab-item.component";
import { XlTabComponent } from "./tab.component";
@NgModule({
    declarations: [XlTabComponent, XlTabItemComponent],
    imports: [CommonModule, XlToggleModule],
    exports: [XlTabComponent, XlTabItemComponent]
})
export class XlTabModule { }
