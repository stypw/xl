import { Component, ElementRef, HostListener, Optional, Self } from "@angular/core";

@Component({
    selector: "[xlWndlimit]",
    templateUrl: "./wnd-limit.compoent.html",
    styleUrls: ["./wnd-limit.compoent.scss"],
    host:{
        draggable:"false" 
    }
})
export class XlWndlimitCompoent {
    @HostListener("dragstart")
    ondragstart(){
        return false;
    } 
    constructor(
        @Optional() @Self() public el: ElementRef
    ) { }
}