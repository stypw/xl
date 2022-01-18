import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { nextFrame } from "@stypw/xl/core";
export type RepeatItemData = {
  $implicit: number;
};
export type RepeatItem = {
  view: EmbeddedViewRef<any>;
  data: RepeatItemData;
};
@Directive({
  selector: '[xlRepeat]'
})
export class XlRepeatDirective {

  @Input()
  set xlRepeatMax(v: number) {
    this._max = v;
    this.updateView();
  }
  @Input()
  set xlRepeatMin(v: number) {
    this._min = v;
    this.updateView();
  }

  @Input()
  set max(v: number) {
    this._max = v;
    this.updateView();
  }
  @Input()
  set min(v: number) {
    this._min = v;
    this.updateView();
  }

  _max = 0;
  _min = 0;

  items: RepeatItem[] = [];

  busy = false;

  async updateView() {
    if (!this.inited) return;
    if (this.busy) return;
    this.busy = true;
    await nextFrame();
    let idx = 0;
    for (let i = this._min; i <= this._max; i++) {
      let item = this.items[idx];
      if (!item) {
        let data: RepeatItemData = { $implicit: i };
        let view = this.vcr.createEmbeddedView(this.template, data);
        item = { view, data };
        this.items.push(item);
      } else {
        item.data.$implicit = i;
      }
      idx++;
    }
    for (let i = idx; i < this.items.length; i++) {
      let item = this.items[i];
      if (!item || !item.data) continue;
      let viewIdx = this.vcr.indexOf(item.view);
      if (viewIdx < 0) continue;
      this.vcr.remove(viewIdx);
    }
    this.items.splice(idx);
    this.busy = false;
  }

  inited = false;

  ngOnInit() {
    this.inited = true;
    this.updateView();
  }

  constructor(
    private template: TemplateRef<any>,
    private vcr: ViewContainerRef
  ) { }

}
