import { Component, Input } from '@angular/core';
import { xl_svg_file_empty, xl_svg_Expand, xl_svg_svg } from "@stypw/xl/data";
export type TreeNode = {
  text: string;
  children?: TreeNode[];
  extra?: any;
  expand?: boolean;
  checked?: boolean;
}



@Component({
  selector: 'xlTree,[xlTree]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class XlTreeComponent {

  emptyFileKey = xl_svg_file_empty;
  expandKey = xl_svg_Expand;
  svgKey = xl_svg_svg;

  @Input()
  nodes: TreeNode[] = [];

  expandChange(node: TreeNode, evt: MouseEvent) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    node.expand = !node.expand;
  }
}
