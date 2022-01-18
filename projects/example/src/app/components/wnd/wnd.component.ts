import { Component } from "@angular/core";
import { sleep } from "@stypw/xl/core"
@Component({
    selector: "div[example-wnd]",
    templateUrl: "./wnd.component.html",
    styleUrls: ["./wnd.component.scss"]
})
export class WndComponent {
    wndShow = false;
    async ngOnInit() {
        await sleep(5000);
        this.wndShow = true;

    
    }
    htmlCode = "";
}