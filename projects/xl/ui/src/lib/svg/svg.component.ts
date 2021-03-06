import { Component, Input } from '@angular/core';
 import { PathData } from "@stypw/xl/core";
@Component({
  selector: '[xlSvg]',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {


  pathes: PathData[] | null = null;
  @Input()
  public set xlSvg(icon: PathData[]) {
    this.pathes = icon;
  }
}
