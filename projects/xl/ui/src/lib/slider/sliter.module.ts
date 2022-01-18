import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { XlSliderComponent } from "./slider.component";
import { XlBindingModule } from "../binding";
@NgModule({
    declarations: [XlSliderComponent],
    imports: [CommonModule,XlBindingModule],
    exports: [XlSliderComponent]
})
export class XlSilderModule { }
