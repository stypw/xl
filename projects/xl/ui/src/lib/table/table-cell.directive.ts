import { Directive, Inject, TemplateRef } from '@angular/core';
import { XlTableInjectonToken, IXlTable } from "./define";
@Directive({
  selector: '[libTableCell]'
})
export class TableCellDirective {

  constructor(template: TemplateRef<any>, @Inject(XlTableInjectonToken) table: IXlTable) {
    table.cellTemplate = template;
  }
}
