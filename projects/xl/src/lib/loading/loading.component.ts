import { Component, ElementRef, HostBinding, Input } from "@angular/core";


@Component({
  selector: 'div[xlLoading]',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class XlLoadingComponent {

  private _absolute: boolean = false;
  @HostBinding("class.absolute")
  @Input()
  public get absolute() { return this._absolute; }
  public set absolute(s: boolean | string | undefined | null) {
    if (typeof s == "boolean") {
      this._absolute = s;
      return;
    }
    if (typeof s == "string") {
      if (s == "") {
        this._absolute = true;
        return;
      }
      let v = s.toLowerCase();
      this._absolute = v == "true";
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
