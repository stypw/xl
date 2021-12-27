import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'xlMenuSwitch,[xlMenuSwitch]',
  templateUrl: './menu-switch.component.html',
  styleUrls: ['./menu-switch.component.scss']
})
export class XlMenuSwitchComponent implements OnInit {
  @Input()
  set open(v: boolean) {
    this._open = v;
  }
  get open() {
    return this._open;
  }
  @Output()
  openChange = new EventEmitter<boolean>();

  @Input()
  duration = "600ms";

  @HostListener("click")
  onClick() {
    this._open = !this._open;
    this.openChange.emit(this._open);
  }

  _open = false;
  constructor() { }
  ngOnInit(): void {
  }

}
