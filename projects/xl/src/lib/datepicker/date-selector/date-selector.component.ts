import { Component, Input, OnInit } from '@angular/core';
import { DatetimeDateService, daySpan } from "../data.service";

type DateType = "PREVMONTH" | "CURRMONTH" | "NEXTMONTH";

type DateItem = {
  year: number;
  month: number;
  date: number;
  text: string;
  tip?: string;
  dateType: DateType;
  actived?: boolean;
};


@Component({
  selector: 'xlDateSelector,[xlDateSelector]',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss', '../date.scss']
})
export class XlDateSelectorComponent implements OnInit {

  oneMonth: DateItem[][];

  get yearNumber() {
    return this.dataService.year;
  }
  get monthNumber() {
    return this.dataService.month + 1;
  }

  constructor(private dataService: DatetimeDateService) {
    this.oneMonth = [];
    for (let i = 0; i <= 5; i++) {
      let array: DateItem[] = [];
      this.oneMonth.push(array);
      for (let j = 0; j <= 7; j++) {
        array.push({
          year: 0,
          month: 0,
          date: 0,
          text: `${i}-${j}`,
          dateType: "CURRMONTH",
          tip: ''
        });
      }
    }
  }

  dateClick(date: DateItem) {
    if (this.actived) {
      this.actived.actived = false;
    }
    this.actived = date;
    date.actived = true;

    this.dataService.setValue(date.year, date.month, date.date);
    this.dataService.setData(date.year, date.month, date.date);
  }

  yearClick() {
    this.dataService.setPanel("YEAR");
  }
  monthClick() {
    this.dataService.setPanel("MONTH");
  }

  toNextMonth() {
    this.dataService.toNextMonth();
  }
  toPrevMonth() {
    this.dataService.toPrevMonth();
  }
  toNextYear() {
    this.dataService.toNextYear();
  }
  toPrevYear() {
    this.dataService.toPrevYear();
  }

  replenishPrevMonth() { }
  replenishNextMonth() { }
  actived: DateItem | null = null;
  isActive(item: DateItem) {
    if (item.year == this.dataService.value.year && item.month == this.dataService.value.month && item.date == this.dataService.value.date) {
      if (this.actived) {
        this.actived.actived = false;
      }
      this.actived = item;
      item.actived = true;
    } else {
      item.actived = false;
    }
  }
  updateView() {
    let curr = this.dataService.currMonth;
    let next = this.dataService.nextMonth;

    let currMonthDays = daySpan(next.getTime() - curr.getTime());
    let prev = this.dataService.prevMonth;
    let prevMonthDays = daySpan(curr.getTime() - prev.getTime());

    let first = curr.getDay();


    let idx = first - 1;
    if (idx == -1) {
      idx = 6;
    }
    if (idx == 0) {
      idx = 7;
    }

    let prevMonthDate = prevMonthDays;
    for (let i = idx - 1; i >= 0; i--) {
      let item = this.oneMonth[0][i];
      item.text = `${prevMonthDate}`;
      item.dateType = "PREVMONTH";
      item.year = prev.getFullYear();
      item.month = prev.getMonth();
      item.date = prevMonthDate;
      this.isActive(item);
      prevMonthDate--;
    }
    for (let i = 1; i <= currMonthDays; i++) {
      let w = Math.floor(idx / 7);
      let d = Math.floor(idx % 7);

      let item = this.oneMonth[w][d];
      item.text = `${i}`;
      item.dateType = "CURRMONTH";
      item.year = curr.getFullYear();
      item.month = curr.getMonth();
      item.date = i;
      this.isActive(item);
      idx++;
    }
    let nextMonthDate = 1;
    while (idx <= 41) {
      let w = Math.floor(idx / 7);
      let d = Math.floor(idx % 7);

      let item = this.oneMonth[w][d];
      item.text = `${nextMonthDate}`;
      item.dateType = "NEXTMONTH";
      item.year = next.getFullYear();
      item.month = next.getMonth();
      item.date = nextMonthDate;
      this.isActive(item);
      nextMonthDate++;
      idx++;
    }
  }

  ngOnInit(): void {
    this.dataService.onMonthChange(this.updateView.bind(this));
    this.updateView();
  }

}
