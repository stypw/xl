import { Component, OnInit } from '@angular/core';
import { IXlConversion } from "@stypw/xl"

@Component({
  selector: 'app-conversion',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss']
})
export class ConversionComponent implements OnInit {

  conversion:IXlConversion = IXlConversion.create();
  texts = ["text0","text1","text2","text3","text4"]
  constructor() { }

  ngOnInit(): void {
  }

  idx=0;

  jump(){
    this.conversion.toIndex(+(this.idx));
  }
  toNext(){
    this.conversion.toNext(true);
  }
  toPrev(){
    this.conversion.toPrev(true);
  }
}
