import { Component, OnInit } from '@angular/core';
import { svgSet, PathData } from "@stypw/xl";
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
    const svgs: { k: string, d: PathData[] }[] = [];
    for (const svg in svgSet) {
      let d = svgSet[svg as K];

      svgs.push({ k: svg, d });
    }
    this.svgs = svgs.sort((a, b) => {
      return a.k.localeCompare(b.k) ? 1 : -1;
    });
  }

}
