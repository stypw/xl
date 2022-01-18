import { Component, OnInit, OnDestroy, ElementRef, HostListener, Input } from '@angular/core';
import { IXlListener } from "@stypw/xl/core";


let topOffset = 120;

interface ScrollElement {
  scrollTop: number;
  scrollBottom: number;
  active(): void;
  unactive(): void;
}

const listener = IXlListener.create();

const elementList: ScrollElement[] = [];

let activedElements: ScrollElement[] | null = null;

function onScroll() {
  let { scrollTop, clientHeight } = document.documentElement;

  let boxTop = scrollTop + topOffset;
  let boxBottom = scrollTop + clientHeight;

  if (activedElements) {
    for (const elt of activedElements) {
      elt.unactive.call(elt);
    }
  }
  activedElements = elementList.filter(i => ((i.scrollTop) <= (boxBottom - 30)) && (i.scrollBottom > (boxTop + 30)));

  if (activedElements) {
    for (const elt of activedElements) {
      elt.active.call(elt);
    }
  }
}

function startListen(element: ScrollElement) {
  if (elementList.length < 1) {
    listener.on("scroll", onScroll);
  }
  elementList.push(element);
}
function endListen(element: ScrollElement) {
  let idx = elementList.indexOf(element);
  if (idx >= 0) {
    elementList.splice(idx, 1);
  }
  if (elementList.length < 1) {
    listener.off("scroll");
  }
}

@Component({
  selector: 'xlLink,[xlLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class XlLinkComponent implements OnDestroy, ScrollElement {

  element?: HTMLElement;

  @Input()
  set xlLink(v: HTMLElement) {
    this.element = v;
    if (this.inited) {
      this.hockScroll();
    }
  }

  @Input()
  xlHash = "";

  @Input()
  xlTargetActived = "";

  @Input()
  xlLinkActived = "";

  actived = false;

  active() {
    if (this.actived) {
      return;
    }
    this.actived = true;
    let link = this.link.nativeElement as HTMLElement;
    if (this.xlLinkActived && link) {
      link.classList.add(this.xlLinkActived);
    }
    let target = this.element as HTMLElement;
    if (this.xlTargetActived && target) {
      target.classList.add(this.xlTargetActived);
    }
    if (this.xlHash) {
      window.location.hash = this.xlHash;
    }

  }
  unactive() {
    if (!this.actived) {
      return;
    }
    this.actived = false;

    let link = this.link.nativeElement as HTMLElement;
    if (this.xlLinkActived && link) {
      link.classList.remove(this.xlLinkActived);
    }
    let target = this.element as HTMLElement;
    if (this.xlTargetActived && target) {
      target.classList.remove(this.xlTargetActived);
    }
  }

  @HostListener("click")
  onClick() {
    if (this.element) {
      window.scrollTo({ top: (this.element.offsetTop - topOffset )-30});
    }
  }
  hockScroll() {
    endListen(this);
    let target = this.element as HTMLElement;
    if (!target) {
      return;
    }
    this.scrollTop = target.offsetTop;
    this.scrollBottom = target.offsetTop + target.offsetHeight;
    startListen(this);
  }
  scrollTop: number = 0;
  scrollBottom: number = 0;
  inited = false;
  ngAfterViewInit() {
    this.hockScroll();
    this.inited = true;
  }

  ngOnDestroy() {
    endListen(this);
  }
  constructor(private link: ElementRef) { }
}
