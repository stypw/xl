import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { IXlBinding } from "../../binding";
import { sleep } from "../../tools";
import { svgSet } from "../../svg";
@Component({
  selector: 'xlClearInput,[xlClearInput]',
  templateUrl: './clear-input.component.html',
  styleUrls: ['./clear-input.component.scss']
})
export class XlClearInputComponent {
  input = IXlBinding.create();
  inFocus = false;
  onFocus() {
    this.inFocus = true;
  }
  inCtrl = false;
  @HostListener("click")
  onClick() {
    this.inCtrl = true;
    if (this.focusAgain) {
      let input = this.input?.element as HTMLInputElement;
      if (input) {
        input.focus();
      }
    }
  }
  close = svgSet.xl_svg_close;
  
  async onBlur() {
    this.inCtrl = false;
    await sleep(200);
    if (!this.inCtrl) {
      this.inFocus = false;
    }
  }

  inputClick(evt: MouseEvent) {
    evt.stopImmediatePropagation();
    evt.stopPropagation();
    evt.preventDefault();
  }

  ngAfterViewInit() {
    let input = this.input?.element as HTMLInputElement;
    if (input) {
      input.onfocus = this.onFocus.bind(this);
      input.onblur = this.onBlur.bind(this);
      input.oninput = this.onInput.bind(this);
      input.onclick = this.inputClick.bind(this);
    }

  }

  _value: string = "";
  @Input()
  set value(v: string) {
    this._value = v;
    let input = this.input?.element as HTMLInputElement;
    if (input) {
      input.value = v || '';
    }
  }

  @Output()
  valueChange = new EventEmitter<string>();

  onInput() {
    let input = this.input?.element as HTMLInputElement;
    if (input) {
      this._value = input.value;
      this.valueChange.emit(this._value);
    }
  }

  focusAgain = false;
  onClear() {
    this.focusAgain = true;
    let input = this.input?.element as HTMLInputElement;
    if (input) {
      input.value = '';
    }
    this._value = "";
    this.valueChange.emit("");
  }

}
