import { Component, OnInit } from '@angular/core';
import { xl_svg_mulu,xl_svg_ico_to_top } from "@stypw/xl/data";

@Component({
  selector: 'div[anchor-page]',
  templateUrl: './anchor-page.component.html',
  styleUrls: ['./anchor-page.component.scss']
})
export class AnchorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  switchIcon = xl_svg_mulu;
  toTopIcon=xl_svg_ico_to_top;

  showAnchor=false;
}
