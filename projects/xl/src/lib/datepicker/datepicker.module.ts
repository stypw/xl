import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlDatepickerComponent } from './datepicker.component';
import { YearpickerComponent } from './yearpicker/yearpicker.component';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { TimepickerComponent } from './timepicker/timepicker.component';



@NgModule({
  declarations: [
    XlDatepickerComponent,
    YearpickerComponent,
    MonthpickerComponent,
    DatepickerComponent,
    TimepickerComponent
  ],
  exports: [XlDatepickerComponent],
  imports: [
    CommonModule
  ]
})
export class XlDatepickerModule { }
