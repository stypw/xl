import { NgModule } from '@angular/core';
import { XlCarouselComponent } from "./carousel.component";
import { XlCarouselItemComponent } from "./carousel-item/carousel-item.component";
import { CommonModule } from '@angular/common';
@NgModule({
    declarations: [XlCarouselComponent, XlCarouselItemComponent],
    imports: [CommonModule],
    exports: [XlCarouselComponent, XlCarouselItemComponent]
})
export class XlCarouselModule { }
