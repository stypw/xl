import { NgModule } from '@angular/core';
import { XlConversionComponent } from "./conversion.component";
import { XlConversionItemComponent } from "./conversion-item/conversion-item.component";
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [XlConversionComponent, XlConversionItemComponent],
    imports: [CommonModule],
    exports: [XlConversionComponent, XlConversionItemComponent]
})
export class XlConversionModule { }
