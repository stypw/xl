import { Component, OnInit } from '@angular/core';
import { XlTableHeader, XlTableRow } from "@stypw/xl/ui";
@Component({
  selector: 'app-anchor',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss']
})
export class AnchorComponent implements OnInit {


  headers:XlTableHeader[]=[
    {key:"valueName",text:"css变量",width:"200px"},
    {key:"description",text:"变量说明",align:"flex-start"},
    {key:"default",text:"默认值",align:"flex-start"},
    {key:"must",text:"是否必须",align:"flex-start"},
  ];
  rows:XlTableRow[]=[
    {valueName:"--color",description:"前景色"},
    {valueName:"--color-1",description:"前景色1"}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
