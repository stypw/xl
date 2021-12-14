import { Component, OnInit, OnDestroy, ElementRef, HostListener, Input } from '@angular/core';
import { IXlListener } from "../listener";
import { Pass } from "../types/types";

const listener = IXlListener.create();
const listenerList: Pass<Event>[] = [];

function startListen(handle: Pass<Event>) {
  if (listenerList.length < 1) {
    listener.on("scroll", (evt: Event) => {
      for (const listener of listenerList) {
        listener(evt);
      }
    });
  }
  listenerList.push(handle);
}
function endListen(handle: Pass<Event>) {
  let idx = listenerList.indexOf(handle);
  if (idx >= 0) {
    listenerList.splice(idx, 1);
  }
  if (listenerList.length < 1) {
    listener.off("scroll");
  }
}

function inScope(s: number, d: number, scope: number) {
  const start = d - scope;
  const end = d + scope;
  return s >= start && s <= end;
}



@Component({
  selector: 'xlLink,[xlLink]',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class XlLinkComponent implements OnInit, OnDestroy {

  element?: HTMLElement;

  @Input()
  set xlLink(v: HTMLElement) {
    this.element = v;
  }

  @Input()
  xlHash = "";

  @Input()
  xlTargetActived = "";

  @Input()
  xlLinkActived = "";

  actived = false;

  active(target: HTMLElement) {
    if (this.actived) {
      return;
    }
    this.actived = true;
    let link = this.link.nativeElement as HTMLElement;
    if (this.xlLinkActived && link) {
      link.classList.add(this.xlLinkActived);
    }
    if (this.xlTargetActived && target) {
      target.classList.add(this.xlTargetActived);
    }
    if (this.xlHash) {
      window.location.hash = this.xlHash;
    }

  }
  unactive(target: HTMLElement) {
    if (!this.actived) {
      return;
    }
    this.actived = false;

    let link = this.link.nativeElement as HTMLElement;
    if (this.xlLinkActived && link) {
      link.classList.remove(this.xlLinkActived);
    }
    if (this.xlTargetActived && target) {
      target.classList.remove(this.xlTargetActived);
    }
  }

  @HostListener("click")
  onClick() {
    if (this.element) {
      window.scrollTo({ top: this.element.offsetTop });

    }
  }



  scrollHandle!: Pass<Event>;
  onScroll(evt: Event) {
    let target = this.element as HTMLElement;
    if (!target) {
      return;
    }

    if (inScope(document.documentElement.scrollTop, target.offsetTop, 120)) {
      this.active(target);
    } else {
      this.unactive(target);
    }
  }
  ngOnInit(): void {
    this.scrollHandle = this.onScroll.bind(this);
    startListen(this.scrollHandle);
  }
  ngOnDestroy() {
    endListen(this.scrollHandle);
  }
  constructor(private link: ElementRef) { }
}
