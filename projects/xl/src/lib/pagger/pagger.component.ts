import { Component, EventEmitter, OnInit } from '@angular/core';
import { AcceptString } from "../types/types";
import { nextFrame } from "../tools";

type Pagger = {
  index: number;
  text: string;
  disabled?: boolean;
  checked?: boolean;
}

@Component({
  selector: 'xlPagger,[xlPagger]',
  templateUrl: './pagger.component.html',
  styleUrls: ['./pagger.component.scss'],
  inputs: ["pageCount", "pageIndex"],
  outputs: ["pageIndexChange"]
})
export class XlPaggerComponent implements OnInit {

  set pageCount(v: AcceptString<number>) {
    if (v) {
      this.count = (+v) || 1;
    } else {
      this.count = 1;
    }
    if (this.inited) this.updateView();
  }
  set pageIndex(v: AcceptString<number>) {
    if (v) {
      this.curr = (+v) || 1;
    } else {
      this.curr = 1;
    }
    if (this.inited) this.updateView();
  }
  pageIndexChange = new EventEmitter<number>();


  count: number = 0;
  curr: number = 0;
  paggers: Pagger[] = [];

  updateView() {
    this.paggers = [];
    if (this.count < 1) {
      this.count = 1;
    }
    if (this.curr > this.count) {
      this.curr = this.count;
    }
    if (this.curr < 1) {
      this.curr = 1;
    }
    

    let idx = this.curr;
    if (idx < 2) {
      idx = 2;
    }
    if (idx > (this.count - 1)) {
      idx = this.count - 1;
    }
    if (idx < 2) {
      this.left = true;
      this.right = true;
      return;
    };

    this.paggers.push({
      index: idx,
      text: `${idx}`,
      disabled: true,
      checked: idx == this.curr
    });
    let left = idx - 1;
    let right = idx + 1;
    for (; this.paggers.length < 5;) {
      if (left > 1) {
        this.paggers.unshift({
          index: left,
          text: `${left}`,
          disabled: false,
          checked: left == this.curr
        });

      }
      if (right < this.count) {
        this.paggers.push({
          index: right,
          text: `${right}`,
          disabled: false,
          checked: right == this.curr
        });
      }
      left--;
      right++;
      if (right >= this.count && left <= 1) {
        break;
      }
    }

    if (this.paggers.length < 1) {
      this.left = true;
      this.right = true;
      return;
    }

    let lst = this.paggers[this.paggers.length - 1];
    if (lst.index >= this.count - 1) {
      this.right = true;
    } else {
      this.right = false;
    }

    let fst = this.paggers[0];
    if (fst.index <= 2) {
      this.left = true;
    } else {
      this.left = false;
    }
  }

  get first() {
    return this.curr == 1;
  }
  get last() {
    return this.curr == this.count;
  }
  right = false;
  left = false;
  get onlyOne() {
    return this.count < 2;
  }

  inited = false;
  async ngAfterViewInit() {
    await nextFrame();
    this.inited = true;
    this.updateView();
  }

  constructor() { }

  ngOnInit(): void {
  }

  toPage(index: number) {
    let idx = index;

    if (idx > this.count) {
      idx = this.count;
    }
    if (idx < 1) {
      idx = 1;
    }
    if (idx == this.curr) return;
    this.curr = idx;
    this.updateView();
    this.pageIndexChange.emit(idx);
  }
  toNext() {
    let idx = this.curr + 1;
    if (idx > this.count) {
      return;
    }
    this.toPage(idx);
  }
  toPrev() {
    let idx = this.curr - 1;
    if (idx < 1) {
      return;
    }
    this.toPage(idx);
  }
}
