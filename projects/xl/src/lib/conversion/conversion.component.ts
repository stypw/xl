import { Component, forwardRef, Input } from '@angular/core';
import { GetNumber, SetNumber, SetValue } from '../types/types';
import { IXlConversionInjection, IXlConversionBox } from "./define";

export interface IXlConversion {
  toIndex(i: number): void;
  get index(): number;
  set index(v: number);
  toNext(loop?: boolean): void;
  toPrev(loop?: boolean): void;
}

type ConversionState = "NONE" | "RIGHT" | "LEFT";

class XlConversion implements IXlConversion {
  getIndexHandle: GetNumber | null = null;
  setIndexHandle: SetNumber | null = null;

  get index(): number {
    let handle = this.getIndexHandle;
    if (handle) {
      return handle();
    }
    return -1;
  }
  set index(v: number) {
    let handle = this.setIndexHandle;
    if (handle) {
      handle(v);
    }
  }

  toIndexHandle:  SetNumber | null = null;
  toNextHandle: SetValue<boolean | undefined> | null = null;
  toPrevHandle: SetValue<boolean | undefined> | null = null;
  toIndex(i: number): void {
    let handle = this.toIndexHandle;
    handle && handle(i);
  }
  toNext(loop?: boolean): void {
    let handle = this.toNextHandle;
    handle && handle(loop);
  }
  toPrev(loop?: boolean): void {
    let handle = this.toPrevHandle
    handle && handle(loop);
  }
}
export namespace IXlConversion {
  export function create(): IXlConversion {
    return new XlConversion();
  }
}
@Component({
  selector: 'xlConversion,[xlConversion]',
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.scss'],
  providers: [
    { provide: IXlConversionInjection, useExisting: forwardRef(() => XlConversionComponent) }
  ]
})
export class XlConversionComponent implements IXlConversionBox {

  count = 0;

  curr = 0;
  left = -1;
  right = 1;

  state: ConversionState = "NONE";

  active(idx: number) {
    let left = idx - 1;
    if (left < 0) {
      left = this.count - 1;
    }
    let right = idx + 1;
    if (right >= (this.count - 1)) {
      right = 0;
    }
    this.left = left;
    this.curr = idx;
    this.right = right;
  }

  getCurrent() {
    return this.curr;
  }

  getIndex() {
    let idx = this.count;
    this.count++;
    return idx;
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

  @Input()
  set xlConversion(handle: IXlConversion | string | null | undefined) {
    if (handle instanceof XlConversion) {
      handle.toIndexHandle = this.toIndex.bind(this);
      handle.toNextHandle = this.toNext.bind(this);
      handle.toPrevHandle = this.toPrev.bind(this);
      handle.getIndexHandle = this.getCurrent.bind(this);
      handle.setIndexHandle = this.toIndex.bind(this);
    }
  }

  toIndex(idx: number) {

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
  }

  toNext(loop: boolean = true) {
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
  }

  toPrev(loop: boolean = true) {
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
  }
}
