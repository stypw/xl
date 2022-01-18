import { Component, ElementRef, HostListener, Inject, Input, OnInit } from '@angular/core';
import { IXlAnchorGroupToken, IXlAnchorGroup, IXlAnchor } from "../define";
@Component({
  selector: 'xlAnchor,[xlAnchor]',
  templateUrl: './anchor.component.html',
  styleUrls: ['./anchor.component.scss']
})
export class XlAnchorComponent implements OnInit, IXlAnchor {


  element?: HTMLElement;

  @Input()
  set xlAnchor(v: HTMLElement) {
    this.element = v;
  }
  @Input()
  xlHash = "";

  get hash(): string {
    return this.xlHash;
  }

  @Input()
  xlTargetActived = "";

  @Input()
  xlLinkActived = "";

  constructor(
    @Inject(IXlAnchorGroupToken)
    private anchorGroup: IXlAnchorGroup,
    private hostElement: ElementRef
  ) { }
  actived = false;
  get scrollRange(): [number, number] {
    let target = this.element as HTMLElement;
    if (target) return [target.offsetTop, target.offsetTop + target.offsetHeight];
    return [0, 0];
  }

  active(): void {
    if (this.actived) {
      return;
    }
    this.actived = true;
    let link = this.hostElement.nativeElement as HTMLElement;
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
  unactive(): void {
    if (!this.actived) {
      return;
    }
    this.actived = false;

    let link = this.hostElement.nativeElement as HTMLElement;
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
    this.anchorGroup.scrollTo(this);
  }
  ngOnInit(): void {
    this.anchorGroup.addItem(this);
  }

}
