import { Component, Input } from '@angular/core';
// import { PathData } from "@stypw/xl/pathes";
@Component({
  selector: '[xlSvg]',
  templateUrl: './svg.component.html',
  styleUrls: ['./svg.component.scss']
})
export class SvgComponent {


  pathes: any[] | null = null;
  @Input()
  public set xlSvg(icon: any[]) {
    this.pathes = icon;
  }
}
