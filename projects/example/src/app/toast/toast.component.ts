import { Component } from "@angular/core";
import { IXlToast,XlToastComponent } from "@stypw/xl";

@Component({
    selector: "div[router-toast]",
    templateUrl: "./toast.component.html",
    styleUrls: ["./toast.component.scss"]
})
export class ToastComponent {
    toast: IXlToast = IXlToast.create();

    count = 1;
    doToast() {
        this.toast.toast(`toast 第 ${this.count} 次点击！`);
        this.count++;
    }

}