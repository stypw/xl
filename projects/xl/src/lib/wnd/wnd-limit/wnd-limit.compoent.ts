import { Component, ElementRef, HostListener, Optional, Self } from "@angular/core";

@Component({
    selector: "xlWndLimit,[xlWndLimit]",
    templateUrl: "./wnd-limit.compoent.html",
    styleUrls: ["./wnd-limit.compoent.scss"],
    host: {
        draggable: "false"
    }
})
export class XlWndLimitCompoent {
    @HostListener("dragstart")
    ondragstart() {
        return false;
    }
    constructor(
        @Optional() @Self() public el: ElementRef
    ) { }
}