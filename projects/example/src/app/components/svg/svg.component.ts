import { Component, OnInit } from '@angular/core';
import { svgSet, PathData,showToast } from "@stypw/xl";
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
      let k = svg.replace("xl_svg_", "");
      svgs.push({ k, d });
    }
    this.svgs = svgs.sort((a, b) => {
      return a.k.localeCompare(b.k) ? 1 : -1;
    });
  }

  async onItemClick(item: { k: string, d: PathData[] }) {
     const ret = await navigator.clipboard.writeText(item.k);
     console.log(ret);
     showToast("复制完成");
  }

}
