import { Component, Input } from '@angular/core';
import { XlConversionItemComponent } from "../../conversion.component";
@Component({
  selector: 'xlTabItem,[xlTabItem]',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class XlTabItemComponent extends XlConversionItemComponent { 

  @Input()
  xlTabItemHeader:string = "";
}
