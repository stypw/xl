import { Component, forwardRef, OnInit } from '@angular/core';
import { IXlConversionInjection,XlConversionComponent,IXlConversionItem } from '../conversion.component';

@Component({
  selector: 'xlCarousel,[xlCarousel]',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss',"../conversion.component.scss"],
  providers: [
    { provide: IXlConversionInjection, useExisting: forwardRef(() => XlCarouselComponent) }
  ]
})
export class XlCarouselComponent extends XlConversionComponent<IXlConversionItem> {

  dotItemClick(item:IXlConversionItem){
    this.setCurr(item.index);
  }
}
