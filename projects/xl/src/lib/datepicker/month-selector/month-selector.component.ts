import { Component, OnInit } from '@angular/core';
import { DatetimeDateService } from '../data.service';
import { svgSet } from "../../svg";
type Month = {
  month: number;
  text: string;
}

@Component({
  selector: 'xlMonthSelector,[xlMonthSelector]',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss', '../date.scss']
})
export class XlMonthSelectorComponent implements OnInit {

  constructor(private dataService: DatetimeDateService) {


  }
  next = svgSet.xl_svg_next;

  monthes: Month[][] = [
    [{ month: 0, text: '一月' }, { month: 1, text: '二月' }, { month: 2, text: '三月' }],
    [{ month: 3, text: '四月' }, { month: 4, text: '五月' }, { month: 5, text: '六月' }],
    [{ month: 6, text: '七月' }, { month: 7, text: '八月' }, { month: 8, text: '九月' }],
    [{ month: 9, text: '十月' }, { month: 10, text: '十一月' }, { month: 11, text: '十二月' }]
  ];

  monthClick(month: Month) {
    this.dataService.setMonth(month.month);
    this.dataService.setPanel("DATE");
  }

  

  ngOnInit(): void {
  }

  get month() {
    return this.dataService.month;
  }

  get year() {
    return this.dataService.year;
  }
}
