import { Directive, Inject, TemplateRef } from '@angular/core';
import { IXlToggleBoxInjection, IXlToggleBox } from "./define";
@Directive({
  selector: '[xlToggleItem]'
})
export class XlToggleItemDirective {

  constructor(
    @Inject(IXlToggleBoxInjection)
    box: IXlToggleBox,
    template: TemplateRef<any>
  ) {
    box.addItem(template);
  }

}
