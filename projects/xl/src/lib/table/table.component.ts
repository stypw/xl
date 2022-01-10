import { Component, forwardRef, Input, OnInit, TemplateRef, Pipe, PipeTransform } from '@angular/core';
import { XlTableInjectonToken, IXlTable, XlTableHeader, XlTableRow } from "./define";
import { svgSet } from "../svg";
@Pipe({ name: "gt" })
export class GtPipe implements PipeTransform {
  transform(v: number, d: number): boolean {
    return v > d;
  }
}

@Pipe({ name: "gte" })
export class GtePipe implements PipeTransform {
  transform(v: number, d: number): boolean {
    return v >= d;
  }
}

@Pipe({ name: "lt" })
export class LtPipe implements PipeTransform {
  transform(v: number, d: number): boolean {
    return v < d;
  }
}
@Pipe({ name: "lte" })
export class LtePipe implements PipeTransform {
  transform(v: number, d: number): boolean {
    return v <= d;
  }
}


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

  showDetail: XlTableRow | null = null;

  detailContentCick(){
    return false;
  }

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

  moreIcon = svgSet.xl_svg_gengduo;


  ngOnInit(): void {

  }



}

