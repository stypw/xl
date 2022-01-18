import { Component, ElementRef, HostBinding, HostListener, Optional, Self } from "@angular/core";
@Component({
    selector: "xlWndLimit,[xlWndLimit]",
    templateUrl: "./wnd-limit.compoent.html",
    styleUrls: ["./wnd-limit.compoent.scss"],
    host: {
        draggable: "false"
    },
    inputs: ["xlFullScreen"]
})
export class XlWndLimitCompoent {



    set xlFullScreen(v: string) {
        console.log(v);
        let val = v?.toLowerCase();
        if (val == "" || v == "fullscreen") {
            this._fullScreen = true;
        } else {
            this._fullScreen = false;
        }
    }

    @HostBinding("class.full-screen")
    _fullScreen = false;

    @HostListener("dragstart")
    ondragstart() {
        return false;
    }
    constructor(
        @Optional() @Self() public el: ElementRef
    ) { }
}