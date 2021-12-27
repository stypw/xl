import { Component, OnInit } from '@angular/core';
import { getAllSvg } from "@stypw/xl";
@Component({
  selector: 'div[router-svg]',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent implements OnInit {

  constructor() { }

  svgs = getAllSvg();

  ngOnInit(): void {
  }

}
