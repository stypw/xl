import { Component, HostListener } from "@angular/core";
const idxKey = Symbol();
@Component({
    selector: "div[example-start]",
    templateUrl: "./start.component.html",
    styleUrls: ["./start.component.scss"]
})
export class StartComponent {

    dataMap: Map<symbol, number> = new Map<symbol, number>();
    dataSet: Set<string> = new Set<string>(["string", "string", "boolean", "key"]);
    @HostListener("document:click")
    onWndClick() {
        let idx = this.dataMap.get(idxKey) || 0;
        console.log(idx);
        idx++;
        this.dataMap.set(idxKey, idx);
        if(idx>5){
            this.dataMap.delete(idxKey);
        }
    }

    ngOnInit() {
    }
}