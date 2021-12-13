import { Component, Input, OnInit } from '@angular/core';

export type TreeNode = {
  text: string;
  children?: TreeNode[];
  extra?: any;
}

@Component({
  selector: 'xlTree,[xlTree]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class XlTreeComponent {

  @Input()
  nodes: TreeNode[] = [];

}
