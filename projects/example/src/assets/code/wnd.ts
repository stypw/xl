import { Component } from "@angular/core";
import { tools, http } from "@stypw/xl"
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

        const [err, ret] = await http.getSync("assets/code/wnd.html", null);
        if (!err) {
            this.htmlCode = ret;
        }
    }
    htmlCode = "";
}