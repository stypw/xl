import { Component, OnInit } from '@angular/core';
import { XlTableHeader,XlTableRow } from "@stypw/xl/ui";
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  headers:XlTableHeader[]=[
    {key:"valueName",text:"css变量",width:"200px"},
    {key:"description",text:"变量说明",align:"flex-start"}
  ];
  rows:XlTableRow[]=[
    {valueName:"--color",description:"前景色"},
    {valueName:"--color-1",description:"前景色1"}
  ]

  ngOnInit(): void {
  }

}
