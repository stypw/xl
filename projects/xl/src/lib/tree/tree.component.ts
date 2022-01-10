import { Component, Input } from '@angular/core';
import { svgSet } from "../svg";
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

  emptyFileKey = svgSet.xl_svg_file_empty;
  expandKey = svgSet.xl_svg_Expand;
  svgKey = svgSet.xl_svg_svg;

  @Input()
  nodes: TreeNode[] = [];

  expandChange(node: TreeNode, evt: MouseEvent) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    node.expand = !node.expand;
  }
}
