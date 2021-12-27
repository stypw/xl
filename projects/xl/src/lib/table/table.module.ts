import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlTableComponent } from './table.component';
import { TableHeaderDirective } from './table-header.directive';
import { TableCellDirective } from './table-cell.directive';



@NgModule({
  declarations: [
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
    CommonModule
  ]
})
export class XlTableModule { }
