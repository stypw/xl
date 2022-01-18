import { Component, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { IXlBinding } from "../binding";
import { absolute,IXlListener } from "@stypw/xl/core";

@Component({
  selector: 'xlColorpicker,[xlColorpicker]',
  templateUrl: './colorpicker.component.html',
  styleUrls: ['./colorpicker.component.scss'],
  host:{
    draggable:"false"
  }
})
export class XlColorpickerComponent implements OnInit, OnDestroy {
  listener!: IXlListener;
  panel: IXlBinding = IXlBinding.create();

  constructor() { }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.listener.destory();
  }


  @HostBinding("style.--color-b")
  colorB: string = '#00f';

  _colorBValue = 0;

  get colorBValue() {
    return this._colorBValue;
  }
  set colorBValue(v: number) {
    this._colorBValue = v;
    this.rgbValue[2] = this._colorBValue;
    this.colorB = `#0000` + v.toString(16).padStart(2, "0");
  }

  pickerLeft = "0px";
  pickerTop = "0px";

  rgbValue: number[] = [0, 0, 0];
  get hexValue() {
    let v = "#";
    v += this.rgbValue[0].toString(16).padStart(2, "0");
    v += this.rgbValue[1].toString(16).padStart(2, "0");
    v += this.rgbValue[2].toString(16).padStart(2, "0");
    return v;
  }
  panelClick(evt: MouseEvent) {
    let [left, top] = absolute([evt.clientX, evt.clientY], this.panel.nativeElement as HTMLElement);
    this.pickerLeft = (left - 10) + "px";
    this.pickerTop = (top - 10) + "px";

    this.rgbValue[0] = 255 - top;
    this.rgbValue[1] = left;
    this.rgbValue[2] = this._colorBValue;
  }

  mouseDownInPicker(evt: MouseEvent) {
    let listen = (e: MouseEvent) => {
      this.panelClick(e);
    }
    let unlisten = () => {
      this.listener.off("mousemove");
      this.listener.off("mouseup");
      this.listener.off("mouseleave");
    }
    
    this.listener.on("mousemove", listen);
    this.listener.on("mouseup", unlisten);
    this.listener.on("mouseleave", unlisten);
  }


  ngAfterViewInit() {
    this.listener = IXlListener.create(this.panel.nativeElement as HTMLElement);
  }


}
