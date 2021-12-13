import { Component, OnInit } from '@angular/core';
import { IXltoggle } from '../toggle';

@Component({
  selector: 'xlTab,[xlTab]',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class XlTabComponent {
  toggle = IXltoggle.create();
}
