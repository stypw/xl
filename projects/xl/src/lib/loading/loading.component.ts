import { Component, ElementRef, HostBinding, Input } from "@angular/core";

type Call = () => void;
type StringCall = (text?: string) => void;
export interface IXlLoading {
  show(text?: string): void;
  hide(): void;
}
class XlLoading implements IXlLoading {
  showHandle: StringCall | null = null;
  hideHandle: Call | null = null;
  show(text?: string): void {
    let handle = this.showHandle;
    handle && handle(text);
  }
  hide(): void {
    let handle = this.hideHandle;
    handle && handle();
  }
}

export namespace IXlLoading {
  export function create(): IXlLoading {
    return new XlLoading();
  }
}

let loading: XlLoading | null = null;
export function loadingRegister(ld: IXlLoading) {
  if (ld instanceof XlLoading) {
    loading = ld;
    return true;
  } else {
    return false;
  }
}

export function loadingUnregister() {
  loading = null;
}

export function showLoading(txt?:string) {
  if (loading) {
    loading.show(txt);
  } else {
    throw `Loading not registered,call loadingRegister to register!`;
  }
}

export function hideLoading() {
  if (loading) {
    loading.hide();
  } else {
    throw `Loading not registered,call loadingRegister to register!`;
  }
}



@Component({
  selector: 'xlLoading,[xlLoading]',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class XlLoadingComponent {
  text: string | null = null;

  @Input()
  set xlLoading(handle: IXlLoading | string | null | undefined) {
    if (handle instanceof XlLoading) {
      handle.showHandle = this.doShow.bind(this);
      handle.hideHandle = this.doHide.bind(this);
    }
  }

  doShow(text?: string) {
    if (text != undefined) {
      this.text = text;
    }
    this._show = true;
  }
  doHide() {
    this._show = false;
  }

  private _fullScreen: boolean = false;
  @HostBinding("class.full-screen")
  @Input()
  public get fullScreen() { return this._fullScreen; }
  public set fullScreen(s: boolean | string | undefined | null) {
    if (typeof s == "boolean") {
      this._fullScreen = s;
      return;
    }
    if (typeof s == "string") {
      if (s == "") {
        this._fullScreen = true;
        return;
      }
      let v = s.toLowerCase();
      this._fullScreen = v == "true";
    }

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

  private _mask: boolean = false;
  @HostBinding("class.mask")
  @Input()
  public get mask() { return this._mask; }
  public set mask(s: boolean | string | undefined | null) {
    if (typeof s == "boolean") {
      this._mask = s;
      return;
    }
    if (typeof s == "string") {
      if (s == "") {
        this._mask = true;
        return;
      }
      let v = s.toLowerCase();
      this._mask = v == "true";
    }

  }
}
