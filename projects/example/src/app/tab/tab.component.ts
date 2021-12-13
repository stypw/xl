import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  constructor() { }

  tabTexts = [
    "tabItem1",
    "tabItem2",
    "tabItem3",
    "tabItem4",
    "tabItem5",
    "tabItem6",
    "tabItem7",
    "tabItem8",
    "tabItem9",
    "tabItem10",
    "tabItem11"
  ]

  ngOnInit(): void {
  }

}
