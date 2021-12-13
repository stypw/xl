import { Component, Directive, HostBinding, Inject, Input, Self, TemplateRef } from '@angular/core';
import { sleep } from '../../tools';
import { IXlConversionBox, IXlConversionInjection } from "../define";

@Component({
  selector: 'xlConversionItem,[xlConversionItem]',
  templateUrl: './conversion-item.component.html',
  styleUrls: ['./conversion-item.component.scss']
})
export class XlConversionItemComponent {
  idx = 0;
  inited = false;
  @HostBinding("style.order")
  get order() {
    if (!this.inited) {
      return 0;
    }
    return this.xlConversionBox.getOrder(this.idx);
  }

  _actived = false;
  @Input()
  set actived(v: boolean | string) {
    if (typeof v == 'boolean') {
      this._actived = v;
    } else if (typeof v == 'string') {
      let val = v.toLowerCase();
      if (val == '') {
        this._actived = true;
      } else {
        this._actived = val == 'true';
      }
    }


  }
  get actived(): boolean {
    return this._actived;
  }
  async ngAfterViewInit() {
    await sleep(50);
    if (this._actived) {
      this.xlConversionBox.active(this.idx);
    }
    this.inited = true;
  }

  constructor(
    @Inject(IXlConversionInjection)
    private xlConversionBox: IXlConversionBox
  ) {
    this.idx = this.xlConversionBox.getIndex();
  }
}



@Directive({
  selector: "xlConversionItemTemplate"
})
export class XlConversionItemTemplate {

  constructor(
    @Inject(IXlConversionInjection)
    private xlConversionBox: IXlConversionBox,
    @Self()
    private template: TemplateRef<any>
  ) { 

    
  }
}