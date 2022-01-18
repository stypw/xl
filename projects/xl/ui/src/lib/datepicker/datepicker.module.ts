import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XlRepeatModule } from "../repeat";
import { XlDatepickerComponent } from './datepicker.component';
import { XlYearSelectorComponent } from './year-selector/year-selector.component';
import { XlMonthSelectorComponent } from './month-selector/month-selector.component';
import { XlDateSelectorComponent } from './date-selector/date-selector.component';
import { XlTimeSelectorComponent } from './time-selector/time-selector.component';
import { XlSelectorPanelComponent } from './selector-panel/selector-panel.component';
import { XlSvgModule } from "../svg";


@NgModule({
  declarations: [
    XlDatepickerComponent,
    XlYearSelectorComponent,
    XlMonthSelectorComponent,
    XlDateSelectorComponent,
    XlTimeSelectorComponent,
    XlSelectorPanelComponent
  ],
  exports: [
    XlDatepickerComponent,
    XlYearSelectorComponent,
    XlMonthSelectorComponent,
    XlDateSelectorComponent,
    XlTimeSelectorComponent
  ],
  imports: [
    XlSvgModule,
    XlRepeatModule,
    CommonModule
  ]
})
export class XlDatepickerModule { }
