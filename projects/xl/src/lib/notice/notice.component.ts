import { Component, HostBinding, Input } from "@angular/core";
import { sleep } from "../tools";

export type Call = () => void;
export type CallBoolean = () => boolean | Promise<boolean>;
export type XlNoticeItem = {
    title: string;
    content: string;
    time: Date;
    click?: Call;
    close?: CallBoolean;
}

type AddCall = (item: XlNoticeItem) => void;
type CountCall = () => number;
export interface IXlNotice {
    show(): void;
    hide(): void;
    add(item: XlNoticeItem): void;
    get count(): number;
}

class XlNotice implements IXlNotice {
    showHandle: Call | null = null;
    hideHandle: Call | null = null;
    addHandle: AddCall | null = null;
    countHandle: CountCall | null = null;
    get count(): number {
        let handle = this.countHandle;
        if (handle) {
            return handle();
        }
        return 0;
    }
    show(): void {
        let handle = this.showHandle;
        handle && handle();
    }
    hide(): void {
        let handle = this.hideHandle;
        handle && handle();
    }
    add(item: XlNoticeItem): void {
        let handle = this.addHandle;
        handle && handle(item);
    }
}

export namespace IXlNotice {
    export function create(): IXlNotice {
        return new XlNotice();
    }
}

let notice: XlNotice | null = null;

export function noticeRegister(n: IXlNotice) {
    if (n instanceof XlNotice) {
        notice = n;
        return true;
    }
    return false;
}

export function noticeUnregister() {
    notice = null;
}

export function showNotice(item: XlNoticeItem) {
    if (notice) {
        notice.add(item);
    } else {
        throw "notice has not registered,call IXlNotice.create to create id and noticeRegister to register id;";
    }
}



@Component({
    selector: "div[xlNotice]",
    templateUrl: "./notice.component.html",
    styleUrls: ["./notice.component.scss"]
})
export class XlNoticeComponent {

    list: XlNoticeItem[] = [];
    last: XlNoticeItem | null = null;
    isShowLast = false;

    @HostBinding("class.show")
    show = false;

    getCount() {
        return this.list.length;
    }

    doShow() {
        this.show = true;
    }
    doHide() {
        this.isShowLast = false;
        this.show = false;
    }
    async doAdd(item: XlNoticeItem) {
        this.list.push(item);
        this.last = item;
        this.isShowLast = true;
        await sleep(1000 * 10);
        this.isShowLast = false;
    }

    @Input()
    set xlNotice(handle: IXlNotice) {
        if (handle instanceof XlNotice) {
            handle.addHandle = this.doAdd.bind(this);
            handle.showHandle = this.doShow.bind(this);
            handle.hideHandle = this.doHide.bind(this);
            handle.countHandle = this.getCount.bind(this);
        } else {
            throw `xlNotice must to bind a IXlNotice object,call IXlNotice.create to create it.`;
        }
    }

    onItemClick(item: XlNoticeItem) {
        let click = item.click;
        click && click();
    }
    async onItemClose(item: XlNoticeItem,evt:MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
        let sure = true;
        let close = item.close;
        if (close) {
            let ret = close();
            if (ret instanceof Promise) {
                sure = await ret;
            } else {
                sure = ret;
            }
        }
        if (sure) {
            let idx = this.list.indexOf(item);
            if (idx >= 0) {
                this.list.splice(idx, 1);
            }
        }
    }

}