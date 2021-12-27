import { Component, OnInit } from '@angular/core';
import { TreeNode } from "@stypw/xl";
@Component({
  selector: 'div[router-tree]',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  constructor() { }

  roots: TreeNode[] = [
    {
      text: "测试一下1",
      children: [
        {
          text: "测试一下1-1",
          children: [
            {
              text: "测试一下1-1-1"
            },
            {
              text: "测试一下1-1-2"
            }
          ]
        },
        {
          text: "测试一下1-2",
          children: [
            {
              text: "测试一下1-2-1"
            }, {
              text: "测试一下1-2-2"
            }, {
              text: "测试一下1-2-3"
            }
          ]
        }
      ]
    },
    {
      text: "测试一下2"
    },
    {
      text: "测试一下3",
      children: [
        {
          text: "测试一下3-1"
        }, {
          text: "测试一下3-2"
        }
      ]
    }
  ];

  ngOnInit(): void {
  }

  expand = true;
  change() {
    this.expand = !this.expand;
  }
}
