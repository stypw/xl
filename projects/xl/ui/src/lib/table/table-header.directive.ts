import { Directive, Inject, TemplateRef } from '@angular/core';
import { XlTableInjectonToken, IXlTable } from "./define";
@Directive({
  selector: '[libTableHeader]'
})
export class TableHeaderDirective {

  constructor(template: TemplateRef<any>, @Inject(XlTableInjectonToken) table: IXlTable) {
    table.headerTemplate = template;
  }

}
