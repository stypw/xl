import { Directive, HostBinding, Inject, InjectionToken, Input } from "@angular/core";
import { nextFrame } from "../tools";
export interface IXlConversionItem {
    readonly index: number;
    order: number;
}

export interface IXlConversionBox {
    addItem(item: IXlConversionItem): number;
}

export const IXlConversionInjection = new InjectionToken<IXlConversionBox>('IXlConversionInjection');
export type ConversionState = "RIGHT" | "LEFT" | "NONE";

@Directive({
    selector: "[xlConversion]"
})
export abstract class XlConversionComponent<T extends IXlConversionItem> implements IXlConversionBox {
   
    @Input()
    duration = "3000ms";
   
    state: ConversionState = "NONE";

    curr = 0;
    left = -1;
    right = 0;

    getCurr() {
        return this.curr;
    }


    async onTransitionend() {
        await nextFrame();
        if (this.state == "LEFT") {
            this.curr = this.right;

        } else {
            this.curr = this.left;
        }
        let left = this.curr - 1;
        let right = this.curr + 1;
        if (this.count == 2) {
            left = -1;
            right = -1;
        } else {
            if (left < 0) {
                left = this.count - 1;
            }
            if (right >= this.count) {
                right = 0;
            }
        }
        this.left = left;
        this.right = right;
        this.state = 'NONE';
        this.updateOrders();
    }

    getOrder(idx: number) {
        if (this.count == 1) {
            return 2;
        }

        if (idx == this.curr) {
            return 2;
        }
        if (idx == this.left) {
            return 1;
        }
        if (idx == this.right) {
            return 3;
        }

        return 4;
    }


    updateOrders() {
        for (const item of this.list) {
            item.order = this.getOrder(item.index);
        }
    }


    async setCurr(idx: number) {
        if (this.curr == idx) {
            return;
        }
        if (idx < 0 || idx >= this.count) {
            return;
        }
        let state:ConversionState = "NONE";
        if (idx > this.curr) {
            this.right = idx;
            state = "LEFT";
        } else {
            this.left = idx;
            state = "RIGHT";
        }
        this.updateOrders();
        await nextFrame();
        this.state = state;
    }
    next() {
        if (this.state != "NONE") {
            return;
        }
        if (this.count < 2) {
            return;
        }
        if (this.count == 2) {
            this.left = -1;
        }
        let right = this.curr + 1;
        if (right >= this.count) {
            right = 0;
        }
        this.right = right;

        this.state = 'LEFT';
        this.updateOrders();
    }
    prev() {
        if (this.state != "NONE") {
            return;
        }
        if (this.count < 2) {
            return;
        }

        let left = this.curr - 1;
        if (left < 0) {
            left = this.count - 1;
        }
        this.left = left;
        this.state = 'RIGHT';
        this.updateOrders();
    }

    list:T[] = [];
    get count() {
        return this.list.length;
    } 

    async ngAfterViewInit() {
        await nextFrame();
        this.updateOrders();
    }

    addItem(item: T): number {
        let idx = this.list.length;
        this.list.push(item);
        return idx;
    }
}



@Directive({
    selector: 'xlConversionItem,[xlConversionItem]'
})
export class XlConversionItemComponent implements IXlConversionItem {
    
    readonly index: number;

    @HostBinding("style.order")
    order: number = 0;

    constructor(
        @Inject(IXlConversionInjection)xlConversionBox: IXlConversionBox
    ) {
        this.index = xlConversionBox.addItem(this);
    }
}
