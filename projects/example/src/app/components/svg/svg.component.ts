import { Component, OnInit } from '@angular/core';
import { svgSet,PathData } from "@stypw/xl";
type K = keyof typeof svgSet;
@Component({
  selector: 'div[router-svg]',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  constructor() { }

  svgs: { k: string, d: PathData[] }[] = [];

  ngOnInit(): void {
    for (const svg in svgSet) {
      let d = svgSet[svg as K];

      this.svgs.push({ k: svg, d });
    }
  }

}
