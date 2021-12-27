import { Component, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { XlTableInjectonToken, IXlTable, XlTableHeader, XlTableRow } from "./define";
@Component({
  selector: 'xlTable,[xlTable]',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: XlTableInjectonToken,
      useExisting: forwardRef(() => XlTableComponent)
    }
  ]
})
export class XlTableComponent implements OnInit, IXlTable {

  @Input()
  headers: XlTableHeader[] | null = null;

  @Input("xlTable")
  @Input("rows")
  rows: XlTableRow[] | null = null;

  get templateColumns() {
    const ws: string[] = [];
    if (!this.headers || !this.headers.length) {
      return "1fr";
    }
    for (const h of this.headers) {
      if (h.width) {
        ws.push(h.width);
      } else {
        ws.push("1fr");
      }
    }
    return ws.join(" ");
  }

  constructor() { }

  headerTemplate: TemplateRef<any> | null = null;
  cellTemplate: TemplateRef<any> | null = null;




  ngOnInit(): void {
  }

}

