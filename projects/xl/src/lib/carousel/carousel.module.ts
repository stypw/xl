import { NgModule } from '@angular/core';
import { XlCarouselComponent } from "./carousel.component";
import { XlCarouselItemComponent } from "./carousel-item/carousel-item.component";
import { CommonModule } from '@angular/common';
import { XlConversionModule } from "../conversion";
@NgModule({
    declarations: [XlCarouselComponent, XlCarouselItemComponent],
    imports: [CommonModule, XlConversionModule],
    exports: [XlCarouselComponent, XlCarouselItemComponent]
})
export class XlCarouselModule { }
