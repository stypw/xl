import { Directive, forwardRef, HostBinding, Inject, InjectionToken } from "@angular/core";
import { sleep } from "../tools";
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
    selector: "[xlConversion]",
    providers: [
        { provide: IXlConversionInjection, useExisting: forwardRef(() => XlConversionComponent) }
    ]
})
export abstract class XlConversionComponent implements IXlConversionBox {
    state: ConversionState = "NONE";

    curr = 0;
    left = -1;
    right = 0;

    getCurr() {
        return this.curr;
    }


    onTransitionend() {
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


    setCurr(idx: number) {
        if (this.curr == idx) {
            return;
        }
        if (idx < 0 || idx >= this.count) {
            return;
        }
        if (idx > this.curr) {
            this.right = idx;
            this.state = "LEFT";
        } else {
            this.left = idx;
            this.state = "RIGHT";
        }
        this.updateOrders();
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

    list: IXlConversionItem[] = [];
    get count() {
        return this.list.length;
    }

    async ngAfterViewInit() {
        await sleep(50);
        this.updateOrders();
    }

    addItem(item: IXlConversionItem): number {
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