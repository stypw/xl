import { Component, EventEmitter, OnInit } from '@angular/core';
import { AcceptString } from "../types/types";
import { nextFrame } from "../tools";

type Pagger = {
  index: number;
  text: string;
  checked?: boolean;
  hidden?: boolean;
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
  list: Pagger[] = [

  ];

  updateView() {
    if (this.count < 1) {
      this.count = 1;
    }
    if (this.curr > this.count) {
      this.curr = this.count;
    }
    if (this.curr < 1) {
      this.curr = 1;
    }

    let start = this.curr - 5;
    let end = this.curr + 5;
    if (start < 2) {
      start = 2;
    }
    if (end > this.count - 1) {
      end = this.count - 1;
    }
    
    let indexes: number[] = [];

    if (this.curr != 1 && this.curr != this.count) {
      indexes.push(this.curr);
    }

    let left = this.curr - 1;
    let right = this.curr + 1;
    for (; indexes.length < 5;) {
      if (left >= start) {
        indexes.unshift(left);
      }
      if (right <= end) {
        indexes.push(right);
      }
      left--;
      right++;
      if (right > end && left < start) {
        break;
      }
    }

    for (let i = 0; i < indexes.length; i++) {
      let idx = indexes[i];
      let item = this.list[i];
      item.index = idx;
      item.text = `${idx}`;
      item.checked = idx == this.curr;
      item.hidden = false;
    }
    for (let i = indexes.length; i < this.list.length; i++) {
      this.list[i].hidden = true;
    }
  }

  get right() {
    if (this.list[4].hidden) {
      return false;
    }
    return ((this.list[4].index) < this.count - 1);
  }
  get left() {
    if (this.list[4].hidden) {
      return false;
    }

    return this.list[0].index > 2;
  }
  get onlyOne() {
    return this.count < 2;
  }

  inited = false;
  async ngAfterViewInit() {
    await nextFrame();
    this.inited = true;
    this.updateView();
  }


  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.list.push({
        index: 0,
        text: "",
        checked: false,
        hidden: false
      });
    }
  }

  toFirst() {
    if (this.curr == 1) return;
    this.toPage(1);
  }
  toLast() {
    if (this.curr == this.count) return;
    this.toPage(this.count);
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
    if (idx > this.count) return;
    this.toPage(idx);
  }
  toPrev() {
    let idx = this.curr - 1;
    if (idx < 1) return;
    this.toPage(idx);
  }
}
