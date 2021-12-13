import { Component, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { IXlToggleBox, IXlToggleBoxInjection } from "./define";
import { AcceptString, Call, SetNumber, GetNumber } from "../types/types";
import { sleep } from "../tools";
export interface IXlToggle {
  get index(): number;
  set index(v: number);
  next(): void;
  prev(): void;
}
class XlToggle implements IXlToggle {
  setIndexHandle: SetNumber | null = null;
  getIndexHandle: GetNumber | null = null;
  nextHandle: Call | null = null;
  prevHandle: Call | null = null;
  get index(): number {
    let handle = this.getIndexHandle;
    if (handle) {
      return handle();
    }
    return -1;
  }
  set index(v: number) {
    let handle = this.setIndexHandle;
    handle && handle(v);
  }
  next(): void {
    let handle = this.nextHandle;
    handle && handle();
  }
  prev(): void {
    let handle = this.prevHandle;
    handle && handle();
  }
}

export namespace IXltoggle {
  export function create(): IXlToggle {
    return new XlToggle();
  }
}

type ToggleItem = {
  context: {
    $implicit: {
      order: number;
      readonly index: number;
    };
  };
  template: TemplateRef<any>;
}
type ToggleState = "NONE" | "RIGHT" | "LEFT";

@Component({
  selector: 'xlToggle,[xlToggle]',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss'],
  providers: [{ provide: IXlToggleBoxInjection, useExisting: forwardRef(() => XlToggleComponent) }]
})
export class XlToggleComponent implements IXlToggleBox {

  @Input()
  set xlToggle(handle: AcceptString<IXlToggle>) {
    if (handle instanceof XlToggle) {
      handle.getIndexHandle = this.getCurr.bind(this);
      handle.setIndexHandle = this.setCurr.bind(this);
      handle.nextHandle = this.next.bind(this);
      handle.prevHandle = this.prev.bind(this);
    }
  }


  state: ToggleState = "NONE";

  curr = 0;
  left = -1;
  right = 0;

  getCurr() {
    return this.curr;
  }


  onTransitionend() {
    if (this.state == "LEFT") {
      this.curr = this.right;

    } else {
      this.curr = this.left;
    }
    let left = this.curr - 1;
    let right = this.curr + 1;
    if (this.count == 2) {
      left = -1;
      right = -1;
    } else {
      if (left < 0) {
        left = this.count - 1;
      }
      if (right >= this.count) {
        right = 0;
      }
    }
    this.left = left;
    this.right = right;
    this.state = 'NONE';
    this.updateOrders();
  }

  getOrder(idx: number) {
    if (this.count == 1) {
      return 2;
    }

    if (idx == this.curr) {
      return 2;
    }
    if (idx == this.left) {
      return 1;
    }
    if (idx == this.right) {
      return 3;
    }

    return 4;
  }


  updateOrders() {
    for (const item of this.list) {
      item.context.$implicit.order = this.getOrder(item.context.$implicit.index);
    }
  }


  setCurr(idx: number) {
    if (this.curr == idx) {
      return;
    }
    if (idx < 0 || idx >= this.count) {
      return;
    }
    if (idx > this.curr) {
      this.right = idx;
      this.state = "LEFT";
    } else {
      this.left = idx;
      this.state = "RIGHT";
    }
    this.updateOrders();
  }
  next() {
    if (this.state != "NONE") {
      return;
    }
    if (this.count < 2) {
      return;
    }
    if (this.count == 2) {
      this.left = -1;
    }
    let right = this.curr + 1;
    if (right >= this.count) {
      right = 0;
    }
    this.right = right;

    this.state = 'LEFT';
    this.updateOrders();
  }
  prev() {
    if (this.state != "NONE") {
      return;
    }
    if (this.count < 2) {
      return;
    }

    let left = this.curr - 1;
    if (left < 0) {
      left = this.count - 1;
    }
    this.left = left;
    this.state = 'RIGHT';
    this.updateOrders();
  }

  list: ToggleItem[] = [];
  get count() {
    return this.list.length;
  }

  async ngAfterViewInit() {
    await sleep(50);
    this.updateOrders();
  }

  addItem(template: TemplateRef<any>): void {
    let item: ToggleItem = {
      context: {
        $implicit: {
          order: this.count + 1,
          index: this.count,
        }
      },
      template: template
    };
    console.log(JSON.stringify(item.context));
    this.list.push(item);
  }
}
