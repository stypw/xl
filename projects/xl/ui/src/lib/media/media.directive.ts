import { Directive, TemplateRef, ViewContainerRef, DoCheck, EmbeddedViewRef } from '@angular/core';

type MediaCall = (evt: MediaQueryListEvent) => void;
let smallQuery: MediaQueryList | null = null;
let methods: Map<symbol, MediaCall> = new Map<symbol, MediaCall>();

export function setSmallQuery(query: MediaQueryList) {
  if (smallQuery) {
    for (const [_, f] of methods) {
      smallQuery.removeEventListener("change", f);
    }
  }
  smallQuery = query;
  if (smallQuery) {
    for (const [_, f] of methods) {
      smallQuery.addEventListener("change", f);
    }
  }
}



function MediaChange(target: any, method: string) {
  let init: Function = Reflect.get(target, "ngOnInit");
  let destroy: Function = Reflect.get(target, "ngOnDestroy");

  let k = Symbol();
  Reflect.set(target, "ngOnInit", function (this: any, ...args: any[]) {
    let f: MediaCall = Reflect.get(target, method);
    if (f) {
      f = f.bind(this);
      smallQuery && smallQuery.addEventListener("change", f);
      methods.set(k, f);
    }
    init && init.call(this, ...args);
  });
  Reflect.set(target, "ngOnDestroy", function (this: any, ...args: any[]) {
    let f = methods.get(k);
    f && smallQuery && smallQuery.removeEventListener("change", f);
    methods.delete(k);
    destroy && destroy.call(this, ...args);
  })
}



@Directive({
  selector: '[xlSmallMedia]',
  inputs: ["xlSmallMedia", "xlSmallMediaOther"]
})
export class XlMediaDirective {

  xlSmallMedia: TemplateRef<any> | null = null;
  xlSmallMediaOther: TemplateRef<any> | null = null;


  updateView(isSmall: boolean) {
    let v = isSmall ? this.xlSmallMedia : this.xlSmallMediaOther;
    if (!v) return;
    this.vcr.clear();
    this.vcr.createEmbeddedView(v);
  }

  @MediaChange
  onMediaChange(evt: MediaQueryListEvent) {
    this.updateView(evt.matches);
  }
  ngOnInit() {
    let small = smallQuery?.matches || false;
    this.updateView(small);
  }

  constructor(private vcr: ViewContainerRef) { }
}
