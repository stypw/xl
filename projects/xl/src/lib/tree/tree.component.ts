import { Component, Input, OnInit } from '@angular/core';

export type TreeNode = {
  text: string;
  children?: TreeNode[];
  extra?: any;
  expand?: boolean;
}

@Component({
  selector: 'xlTree,[xlTree]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class XlTreeComponent {

  @Input()
  nodes: TreeNode[] = [];

  expandChange(node: TreeNode,evt:MouseEvent) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
    console.log(node);
    node.expand = !node.expand;
  }
}
