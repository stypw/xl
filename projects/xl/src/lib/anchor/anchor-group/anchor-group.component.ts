import { Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { IXlListener } from '../../listener';
import { nextFrame } from '../../tools';
import { IXlAnchor, IXlAnchorGroup, IXlAnchorGroupToken } from "../define";

function isActived(pos: number, curr: IXlAnchor, prev: IXlAnchor | null, next: IXlAnchor | null) {
  let [start] = curr.scrollRange;
 
  if (next) {
    return pos >= start && pos < next.scrollRange[0];
  }
  return pos >= start;
}

@Component({
  selector: 'xlAnchorGroup,[xlAnchorGroup]',
  templateUrl: './anchor-group.component.html',
  styleUrls: ['./anchor-group.component.scss'],
  providers: [
    { provide: IXlAnchorGroupToken, useExisting: forwardRef(() => XlAnchorGroupComponent) }
  ]
})
export class XlAnchorGroupComponent implements OnInit, IXlAnchorGroup, OnDestroy {
  listener = IXlListener.create();
  list: IXlAnchor[] = [];
  addItem(item: IXlAnchor): void {
    this.list.push(item);
  }

  @Input()
  xlTopOffset: number = 40+38+64;

  @Input()
  xlBottomOffset = 80;

  @Input()
  xlRange: number = 30;


  realHeight: number = 0;

  onScroll() {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    let count = clientHeight - this.xlTopOffset - this.xlBottomOffset;
    let scrollTotal = scrollHeight - count;
    let pen = scrollTop / scrollTotal;

    let viewPos = pen * count + this.xlTopOffset;
    let realPos = pen * scrollHeight + this.xlTopOffset;

    this.linePos = viewPos + "px";
    this.realHeight = realPos;

    this.list.sort((a, b) => a.scrollRange[0] - b.scrollRange[0]);

    for (let i = 0; i < this.list.length; i++) {
      let elt = this.list[i];
      let prev = i - 1;
      let next = i + 1;
      if (isActived(realPos, elt, prev >= 0 ? this.list[prev] : null, next < this.list.length ? this.list[next] : null)) {
        elt.active();

      } else {
        elt.unactive();
      }
    }
  }

  scrollPosFromRealPos(realPos: number): number {
    let { clientHeight, scrollHeight } = document.documentElement;

    let count = clientHeight - this.xlTopOffset - this.xlBottomOffset;
    let scrollTotal = scrollHeight - count;

    let pen = (realPos - (this.xlTopOffset-10)) / scrollHeight;
    let scrollTop = scrollTotal * pen;
    return scrollTop;
  }

  linePos = "200px";

  ngOnInit(): void {
    this.listener.on("scroll", this.onScroll.bind(this));
  }
  ngOnDestroy(): void {
    this.listener.destory();
  }

  scrollTo(item: IXlAnchor): void {
    window.scrollTo({ top: this.scrollPosFromRealPos(item.scrollRange[0]) });
  }

  async ngAfterViewInit() {
    await nextFrame();
    let hash = window.location.hash;
    if (hash) {
      hash = hash.replace("#", "");
    }
    if (hash) {
      let filter = this.list.filter(i => i.hash == hash);
      if (filter && filter.length) {
        this.scrollTo(filter[0]);
      }
    }
  }

}
