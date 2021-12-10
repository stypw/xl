
import { Component, Input, Optional, Self, ElementRef, HostListener, HostBinding } from "@angular/core";
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
  selector: "[xlWnd]",
  templateUrl: "./wnd.component.html",
  styleUrls: ["./wnd.component.scss"],
  host: {
    draggable: "false"
  }
})
export class XlWndComponent {
  listenHandle: MouseEventHandle = null;
  unlistenHandle: MouseEventHandle = null;

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

  clearMove(evt: MouseEvent) {
    this.moveHandle = null;
  }

  ngOnInit() {
    this.listenHandle = this.mouseMoveInPanel.bind(this);
    this.unlistenHandle = this.clearMove.bind(this);

    if (this.panel) {
      this.panel.el?.nativeElement?.addEventListener("mousemove", this.listenHandle);
      this.panel.el?.nativeElement?.addEventListener("mouseleave", this.unlistenHandle);
      this.panel.el?.nativeElement?.addEventListener("mouseup", this.unlistenHandle);
    } else {
      window.addEventListener("mousemove", this.listenHandle);
      window.addEventListener("mouseleave", this.unlistenHandle);
      window.addEventListener("mouseup", this.unlistenHandle);
    }
  }

  ngOnDestroy() {
    if (this.panel) {
      this.listenHandle && this.panel.el?.nativeElement?.removeEventListener("mousemove", this.listenHandle);
      this.unlistenHandle && this.panel.el?.nativeElement?.removeEventListener("mouseleave", this.unlistenHandle);
      this.unlistenHandle && this.panel.el?.nativeElement?.removeEventListener("mouseup", this.unlistenHandle);
    } else {
      this.listenHandle && window.removeEventListener("mousemove", this.listenHandle);
      this.unlistenHandle && window.removeEventListener("mouseleave", this.unlistenHandle);
      this.unlistenHandle && window.removeEventListener("mouseup", this.unlistenHandle);
    }
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
        console.log(rect.width, left, maxWidth);
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.panelTop;
    const left = viewRect.left - this.panelLeft;
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.panelTop;
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const left = viewRect.left - this.panelLeft;
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.panelTop;
    const left = viewRect.left - this.panelLeft;
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const height = view.clientHeight;
    const width = view.clientWidth;
    const viewRect = view.getBoundingClientRect();
    const top = viewRect.top - this.panelTop;
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
    const view = (this.resizeBorder.nativeElement as HTMLElement);
    const width = view.clientWidth;
    const height = view.clientHeight;
    const viewRect = view.getBoundingClientRect();
    const left = viewRect.left - this.panelLeft;
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
      this.panelTop = clientRect.top;
      this.panelLeft = clientRect.left;
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
  ngDoCheck() {
    this.updateView();
  }

  panelLeft = 0;
  panelTop = 0;

  constructor(
    @Self() private resizeBorder: ElementRef,
    @Optional() private panel: XlWndLimitCompoent,
  ) { }

}
