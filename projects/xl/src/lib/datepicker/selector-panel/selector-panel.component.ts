import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'xlSelectorPanel,[xlSelectorPanel]',
  templateUrl: './selector-panel.component.html',
  styleUrls: ['./selector-panel.component.scss']
})
export class XlSelectorPanelComponent implements OnInit {

  @Input()
  year: number = 1;
  @Output()
  yearChange = new EventEmitter<number>();

  @Input()
  month: number = 1;
  @Output()
  monthChange = new EventEmitter<number>();

  @Output()
  chooseYear = new EventEmitter<void>();
  @Output()
  chooseMonth = new EventEmitter<void>();

  prevYear() {

  }
  nextYear() {

  }

  prevMonth() {

  }
  nextMonth() {

  }


  constructor() { }

  ngOnInit(): void {
  }

}
