import { Component, OnInit } from '@angular/core';
import { DatetimeDateService } from "./data.service";


@Component({
  selector: 'xlDatepicker,[xlDatepicker]',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  providers: [DatetimeDateService]
})
export class XlDatepickerComponent implements OnInit {

  constructor(private dataService: DatetimeDateService) { }

  ngOnInit(): void {
  }

  get panelType() {
    return this.dataService.panelType;
  }
}
