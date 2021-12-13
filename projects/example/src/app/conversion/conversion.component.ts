import { Component, OnInit } from '@angular/core';
import { IXlConversion, IXltoggle, IXlToggle } from "@stypw/xl"

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {

  conversion: IXlConversion = IXlConversion.create();
  toggle = IXltoggle.create();
  texts = ["text0", "text1", "text2", "text3", "text4"]
  constructor() { }

  ngOnInit(): void {
  }

  idx = 0;

  jump() {
    this.toggle.index = +(this.idx);
  }
  toNext() {
    this.toggle.next();
  }
  toPrev() {
    this.toggle.prev();
  }
}
