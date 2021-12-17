import { Component, Directive, forwardRef } from '@angular/core';
import { IXlConversionInjection, XlConversionComponent } from "../conversion.component";

import { IXlTabItem } from "./define";

@Component({
  selector: 'xlTab,[xlTab]',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss', "../conversion.component.scss"],
  providers: [
    { provide: IXlConversionInjection, useExisting: forwardRef(() => XlTabComponent) }
  ]
})
export class XlTabComponent extends XlConversionComponent<IXlTabItem> {

  haderItemClick(item: IXlTabItem) {
    this.setCurr(item.index);
  }

  override xlConversionDuration = "300ms";
}


@Directive({
  selector: "[xlTabHeaderItem]"
})
export class XlTabHeaderItemDirective {

}