
import { Component, Input, Optional, Self, ElementRef, HostListener, HostBinding } from "@angular/core";
import { IXlListener } from "../listener";
import { XlWndLimitCompoent } from "./wnd-limit/wnd-limit.compoent";

export type MouseEventHandle = ((evt: MouseEvent) => void) | null;

export type SetRect = {
  left?: number;
  top?: number;
  right?: number;
  bottom?: number;
  width?: number;
  height?: number;
};

@Component({
  selector: "xlWnd,[xlWnd]",
  templateUrl: "./wnd.component.html",
  styleUrls: ["./wnd.component.scss"],
  host: {
    draggable: "false"
  }
})
export class XlWndComponent {

  listener: IXlListener;

  moveHandle: MouseEventHandle = null;
  mouseMoveInPanel(evt: MouseEvent) {
    let call = this.moveHandle;
    if (call) { call(evt) };
  }

  @HostListener("dragstart")
  ondragstart() {
    return false;
  }

  private _show: boolean = false;
  @HostBinding("class.show")
  @Input()
  public get show() { return this._show; }
  public set show(s: boolean | string | undefined | null) {
    if (typeof s == "boolean") {
      this._show = s;
      return;
    }
    if (typeof s == "string") {
      if (s == "") {
        this._show = true;
        return;
      }
      let v = s.toLowerCase();
      this._show = v == "true";
    }

  }

  startListen() {
    this.listener.on("mousemove", this.mouseMoveInPanel.bind(this));
    this.listener.on("mouseleave", this.endListen.bind(this));
    this.listener.on("mouseup", this.endListen.bind(this));
  }
  endListen() {
    this.listener.off("mousemove");
    this.listener.off("mouseleave");
    this.listener.off("mouseup");
    this.moveHandle = null;
  }

  ngOnDestroy() {
    this.listener.destory();
  }

  doResize(rect: SetRect) {
    const view = (this.resizeBorder.nativeElement as HTMLElement);

    const panel = this.panel?.el?.nativeElement;

    let maxWidth = window.innerWidth;
    let maxHeight = window.innerHeight;
    let clientLeft = 0;
    let clientTop = 0;
    if (panel) {
      const clientRect = panel.getBoundingClientRect();
      maxWidth = clientRect.width;
      maxHeight = clientRect.height;
      clientLeft = clientRect.left;
      clientTop = clientRect.top;
    }
    let { left, top, right, bottom, width, height } = rect;
    let viewRect = view.getBoundingClientRect();
    if (left == undefined) {
      left = viewRect.left - clientLeft;
    }
    if (top == undefined) {
      top = viewRect.top - clientTop;
    }
    if (right == undefined) {
      right = viewRect.right;
    }
    if (bottom == undefined) {
      bottom = viewRect.bottom;
    }
    if (width == undefined) {
      width = viewRect.width;
    }
    if (height == undefined) {
      height = viewRect.height;
    }

    if (rect.left !== undefined) {
      if (rect.left < 0) rect.left = 0;
      if (rect.left > (maxWidth - width)) rect.left = maxWidth - width;
      view.style.left = rect.left + 'px';
    }

    if (rect.top !== undefined) {
      if (rect.top < 0) rect.top = 0;
      if (rect.top > (maxHeight - height)) rect.top = maxHeight - height;
      view.style.top = rect.top + 'px';
    }

    if (rect.right !== undefined) {
      view.style.right = rect.right + 'px';
    }
    if (rect.bottom !== undefined && rect.bottom < maxHeight) {
      view.style.bottom = rect.bottom + 'px';
    }
    if (rect.width !== undefined) {
      if (rect.width > (maxWidth - left)) {
        rect.width = maxWidth - left
      };
      view.style.width = rect.width + "px";
    }
    if (rect.height !== undefined) {
      if (rect.height > (maxHeight - top)) rect.height = maxHeight - top;
      view.style.height = rect.height + "px";
    }
  }

  mouseDownInHeader(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const viewRect = view.getBoundingClientRect();

    const panelRect = this.getPanelRect();
    const top = viewRect.top - panelRect.top;
    const left = viewRect.left - panelRect.left;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const offsetX = (now.clientX - start.clientX);
      const offsetY = (now.clientY - start.clientY);

      let setRect = {
        top: top + offsetY,
        left: left + offsetX
      };
      self.doResize(setRect);
    };
  }

  mouseDownInTop(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.getPanelRect().top;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const offset = (now.clientY - start.clientY);
      view.style.height = `${height - offset}px`;

      let setRect = {
        top: top + offset
      };
      self.doResize(setRect);
    };
  }
  mouseDownInBottom(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const domRect = {
        height: height + (now.clientY - start.clientY)
      }
      self.doResize(domRect);
    };
  }
  mouseDownInLeft(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const left = viewRect.left - this.getPanelRect().left;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const offset = (now.clientX - start.clientX);
      const domRect = {
        width: width - offset,
        left: left + offset
      }
      self.doResize(domRect);

    };
  }
  mouseDownInRight(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const width = view.clientWidth;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const domRect = {
        width: width + (now.clientX - start.clientX)
      }
      self.doResize(domRect);
    };
  }

  mouseDownInTopLeft(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const panelRect = this.getPanelRect();
    const top = viewRect.top - panelRect.top;
    const left = viewRect.left - panelRect.left;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      let offsetY = (now.clientY - start.clientY);
      let offsetX = (now.clientX - start.clientX);

      const domRect = {
        height: height - offsetY,
        top: top + offsetY,
        width: width - offsetX,
        left: left + offsetX,
      }
      self.doResize(domRect);
    };
  }
  mouseDownInTopRight(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.getPanelRect().top;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const offset = (now.clientY - start.clientY);
      const domRect = {
        height: height - offset,
        top: top + offset
      }
      self.doResize(domRect);

      view.style.width = `${width + (now.clientX - start.clientX)}px`;
    };
  }
  mouseDownInBottomLeft(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const width = view.clientWidth;
    const height = view.clientHeight;
    const viewRect = view.getBoundingClientRect();
    const left = viewRect.left - this.getPanelRect().left;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const offset = (now.clientX - start.clientX);
      const domRect = {
        left: left + offset,
        height: height + (now.clientY - start.clientY),
        width: width - offset
      }
      self.doResize(domRect);
    };
  }
  mouseDownInBottomRight(start: MouseEvent) {
    this.startListen();
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const width = view.clientWidth;
    const self = this;
    this.moveHandle = (now: MouseEvent) => {
      const domRect = {
        height: height + (now.clientY - start.clientY),
        width: width + (now.clientX - start.clientX)
      }
      self.doResize(domRect);
    };
  }

  getPanelRect(): DOMRect {
    const panel = this.panel?.el?.nativeElement;

    if (panel) {
      return panel.getBoundingClientRect();
    } else {
      return new DOMRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  updateView() {
    if (this.inited) {
      return;
    }
    const view = (this.resizeBorder?.nativeElement as HTMLElement);
    if (!view) {
      return;
    }
    const viewRect = view.getBoundingClientRect();
    if (!viewRect || !viewRect.height) {
      return;
    }
    this.inited = true;
    const panel = this.panel?.el?.nativeElement;
    let width = 0, height = 0;
    if (panel) {
      const clientRect = panel.getBoundingClientRect();
      width = clientRect.width;
      height = clientRect.height;
    } else {
      width = window.innerWidth;
      height = window.innerHeight;
    }
    view.style.top = `${(height - viewRect.height) / 2}px`;
    view.style.left = `${(width - viewRect.width) / 2}px`;
  }

  ngAfterViewInit() {

    if (this.panel) {
      this.resizeBorder.nativeElement.style.position = "absolute";
    } else {
      this.resizeBorder.nativeElement.style.position = "fixed";
    }
    this.updateView();
  }
  inited = false;
  
  constructor(
    @Self() private resizeBorder: ElementRef,
    @Optional() private panel: XlWndLimitCompoent,
  ) {
    this.listener = IXlListener.create(panel?.el?.nativeElement);
  }

}
