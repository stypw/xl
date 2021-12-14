import { Component, OnInit } from '@angular/core';
import { AcceptString } from "../types/types";
@Component({
  selector: 'xlProcess,[xlProcess]',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss'],
  inputs: ["value"]
})
export class XlProcessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  _value: string = "0%";

  set value(v: AcceptString<number>) {
    if (typeof v == 'string') {
      if (v == '') {
        this._value = "0%";
      } else {
        this._value = v;
      }
    } else if (typeof v == 'number') {
      this._value = v + "%";
    } else {
      this._value = "0%";
    }
  }
  get value() {
    return this._value;
  }

}
