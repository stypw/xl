import { Component, ElementRef, EventEmitter, HostListener } from '@angular/core';
import { AcceptString,nextFrame ,IXlListener} from '@stypw/xl/core';
import { IXlBinding } from "../binding";
@Component({
  selector: 'xlSlider,[xlSlider]',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  outputs: ["valueChange"],
  inputs: ["value", "max", "min", "step"],
  host:{
    draggable:"false"
  }
})
export class XlSliderComponent {
  unlisten() {
    this.listener.off("mousemove");
    this.listener.off("mouseup");
    this.listener.off("mouseleave");
  }

  ngOnDestroy() {
    this.listener.destory();
  }
  inited = false;
  valueBusy = false;
  stepBusy = false;
  async updateStepView() {
    if (!this.inited) return;
    if (this.stepBusy) return;
    this.stepBusy = true;
    await nextFrame();
    this.stepBlocks = [];
    if (this._step >= 1) {
      const box = this.box.nativeElement as HTMLElement;
      const picker = this.picker.nativeElement as HTMLElement;
      const boxRect = box.getBoundingClientRect();
      const pickerRect = picker.getBoundingClientRect();
      const max = boxRect.width - pickerRect.width;

      let once = max / (this._max - this._min);
      for (let v = 0; v <= (this._max - this._min); v += this._step) {
        this.stepBlocks.push(v * once);
      }
    }
    this.stepBusy = false;
  }
  async updateValueView() {
    if (!this.inited) return;
    if (this.valueBusy) return;
    this.valueBusy = true;
    await nextFrame();
    const box = this.box.nativeElement as HTMLElement;
    const picker = this.picker.nativeElement as HTMLElement;
    const showValue = this.showValue.nativeElement as HTMLElement;
    const boxRect = box.getBoundingClientRect();
    const pickerRect = picker.getBoundingClientRect();

    const max = boxRect.width - pickerRect.width;

    let once = max / (this._max - this._min);
    let val = this._value - this._min;
    let pos = val * once;
    picker.style.left = pos + "px";
    showValue.style.width = (pos + 6) + "px";
    this.valueBusy = false;
  }

  stepBlocks: number[] = [];

  async ngAfterViewInit() {
    const self = this;
    this.inited = true;
    await nextFrame();
    if (self._value < self._min) {
      self._value = self._min;
    }
    this.updateStepView();
    this.updateValueView();
  }

  @HostListener("click", ["$event"])
  onClick(evt: MouseEvent) {
    const self = this;
    const box = this.box.nativeElement as HTMLElement;
    const picker = this.picker.nativeElement as HTMLElement;
    const showValue = this.showValue.nativeElement as HTMLElement;

    const boxRect = box.getBoundingClientRect();
    const pickerRect = picker.getBoundingClientRect();
    const max = boxRect.width - pickerRect.width;

    let pos = (evt.clientX - boxRect.left);
    if (pos < 0) {
      pos = 0;
    }
    if (pos > max) {
      pos = max;
    }
    pos = self.valueDetail(pos, max);
    picker.style.left = pos + "px";
    showValue.style.width = (pos + 6) + "px";
  }


  valueDetail(curr: number, max: number) {
    let once = max / (this._max - this._min);
    let val = curr / once;
    val = Math.round(val);
    if (this._step < 1) {
      this._value = val + this._min;
      this.valueChange.emit(this._value);
      return curr;
    }
    val = val / this._step;
    val = Math.round(val);
    val = val * this._step;
    this._value = val + this._min;
    this.valueChange.emit(this._value);
    return val * once;
  }

  mouseDownInPicker(start: MouseEvent) {
    const self = this;
    const box = this.box.nativeElement as HTMLElement;
    const picker = this.picker.nativeElement as HTMLElement;
    const showValue = this.showValue.nativeElement as HTMLElement;

    const boxRect = box.getBoundingClientRect();
    const pickerRect = picker.getBoundingClientRect();
    const left = pickerRect.left - boxRect.left;
    const max = boxRect.width - pickerRect.width;

    self.listener.on("mousemove", (end: MouseEvent) => {
      let pos = left + (end.clientX - start.clientX);
      if (pos < 0) {
        pos = 0;
      }
      if (pos > max) {
        pos = max;
      }
      pos = self.valueDetail(pos, max);
      picker.style.left = pos + "px";
      showValue.style.width = (pos + 6) + "px";
    });
    self.listener.on("mouseup", self.unlisten.bind(self));
    self.listener.on("mouseleave", self.unlisten.bind(self));
  }

  valueChange = new EventEmitter<number>();

  set value(v: AcceptString<number>) {
    if (typeof v == 'string') {
      this._value = (+v) || 0;
    } else if (typeof v == 'number') {
      this._value = v;
    } else {
      this._value = 0;
    }
    this.updateValueView();
  }

  set max(v: AcceptString<number>) {
    if (typeof v == 'string') {
      this._max = (+v) || 0;
    } else if (typeof v == 'number') {
      this._max = v;
    } else {
      this._max = 0;
    }
    this.updateStepView();
    this.updateValueView();
  }
  set min(v: AcceptString<number>) {
    if (typeof v == 'string') {
      this._min = (+v) || 0;
    } else if (typeof v == 'number') {
      this._min = v;
    } else {
      this._min = 0;
    }
    this.updateStepView();
    this.updateValueView();
  }
  set step(v: AcceptString<number>) {
    if (typeof v == 'string') {
      this._step = (+v) || 0;
    } else if (typeof v == 'number') {
      this._step = v;
    } else {
      this._step = 0;
    }
    this.updateStepView();
  }

  picker = IXlBinding.create();
  showValue = IXlBinding.create();
  listener = IXlListener.create();

  _max = 100;
  _min = 0;
  _step = 0;
  _value = 11;

  constructor(
    private box: ElementRef
  ) { }
}
