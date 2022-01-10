import { Component, OnInit } from '@angular/core';
import { svgSet } from "@stypw/xl";

@Component({
  selector: 'div[anchor-page]',
  templateUrl: './anchor-page.component.html',
  styleUrls: ['./anchor-page.component.scss']
})
export class AnchorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  switchIcon = svgSet.xl_svg_mulu;
  toTopIcon=svgSet.xl_svg_ico_to_top;

  showAnchor=false;
}
