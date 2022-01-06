import { Component, OnInit } from '@angular/core';
import { DatetimeDateService } from '../data.service';
import { svgSet } from "../../svg";
const yearCount = 20;

@Component({
  selector: 'xlYearSelector,[xlYearSelector]',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss','../date.scss']
})
export class XlYearSelectorComponent implements OnInit {

  constructor(private dataService: DatetimeDateService) {

  }
next = svgSet.xl_svg_next;
  start = 0;

  year = 0;

  ngOnInit(): void {
    this.year = this.dataService.year;
    let remainder = this.year % yearCount;
    this.start = this.year - remainder;
  }

  toPrevGroup(){
    this.start -= 20;
  }
  toNextGroup(){
    this.start += 20;
  }
  yearClick(){
    this.dataService.setPanel("DATE");
  }
  yearItemClick(y:number){
    this.year = y;
    this.dataService.toYear(y);
    this.dataService.setPanel("DATE");
  }
}
