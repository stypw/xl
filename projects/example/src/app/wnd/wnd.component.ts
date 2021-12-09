import { Component } from "@angular/core";
import { tools } from "@stypw/xl"
@Component({
    selector: "div[example-wnd]",
    templateUrl: "./wnd.component.html",
    styleUrls: ["./wnd.component.scss"]
})
export class WndComponent {
    wndShow = false;
    async ngOnInit() {
        await tools.sleep(5000);
        this.wndShow = true;
    }

}