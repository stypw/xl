import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

export type RecursionItem = { [k: string]: any; }
export type Recursion = RecursionItem | RecursionItem[];

const defaultKey = "children";

@Directive({
  selector: '[xlRecursion]'
})
export class XlRecursionDirective {


  @Input()
  key = defaultKey;

  @Input()
  set xlRecursionRecursion(v: Recursion) {
    this._xlRecursion = v;

  }
  _xlRecursion: Recursion | null = null;
  createView(item: RecursionItem, pathes: RecursionItem[], level: number) {

    let isLeaf = true;
    let children = item[this.key || defaultKey];
    if (children && Array.isArray(children) && children.length > 0) {
      isLeaf = false;
    }
    this.vcr.createEmbeddedView(this.template, { $implicit: item, leaf: isLeaf, pathes, level });

    if (!isLeaf) {
      for (const i of children) {
        this.createView(i, [item, ...pathes], level + 1);
      }
    }
  }
  updateView() {
    if (!this._xlRecursion) return;
    if (Array.isArray(this._xlRecursion)) {
      for (const item of this._xlRecursion) {
        this.createView(item, [], 0);
      }
    } else {
      this.createView(this._xlRecursion, [], 0);
    }
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
