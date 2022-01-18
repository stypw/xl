import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlTableComponent,GtPipe,GtePipe,LtPipe,LtePipe } from './table.component';
import { TableHeaderDirective } from './table-header.directive';
import { TableCellDirective } from './table-cell.directive';
import { XlSvgModule } from "../svg";
import { XlEventOnceModule } from "../event-once";

@NgModule({
  declarations: [
    GtPipe,GtePipe,LtPipe,LtePipe,
    XlTableComponent,
    TableHeaderDirective,
    TableCellDirective
  ],
  exports: [
    XlTableComponent,
    TableHeaderDirective,
    TableCellDirective
  ],
  imports: [
    XlEventOnceModule,
    XlSvgModule,
    CommonModule
  ]
})
export class XlTableModule { }
