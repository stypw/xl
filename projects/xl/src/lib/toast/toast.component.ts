import { Component, Input } from "@angular/core";
type ToastHandle = (txt: string) => void;
export interface IXlToast {
    toast(txt: string): void;
}
class XlToast implements IXlToast {
    toastHandle: ToastHandle | null = null;
    toast(txt: string): void {
        let handle = this.toastHandle;
        handle && handle(txt);
    }
}
export namespace IXlToast {
    export function create(): IXlToast {
        return new XlToast();
    }
}

let toast: XlToast | null = null;
export function toastRegister(t: IXlToast) {
    if (t instanceof XlToast) {
        toast = t;
        return true;
    }
    return false;
}

export function toastUnregister() {
    toast = null;
}

export function showToast(txt: string) {
    if (toast) {
        toast.toast(txt);
    } else {
        throw `Toast not registered; Call  toastRegister to register;`;
    }
}

type ToastContent = {
    text: string;
}
@Component({
    selector: "div[xlToast]",
    templateUrl: './toast.component.html',
    styleUrls: ['./toast.component.scss']
})
export class XlToastComponent {
    contents: ToastContent[] = [];

    private doToast(text: string) {
        this.contents.push({ text });
    }

    @Input()
    set xlToast(handle: IXlToast | string | null | undefined) {
        if (handle instanceof XlToast) {
            handle.toastHandle = this.doToast.bind(this);
        } else {
            throw "toast error,call IXlToast.create to create one!";
        }
    }

    toastEnd(content: ToastContent) {

        const idx = this.contents.indexOf(content);
        if (idx >= 0) {
            this.contents.splice(idx, 1);
        }
    }
}
