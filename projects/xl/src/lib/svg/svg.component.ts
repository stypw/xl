import { Component, Input } from "@angular/core";
import { svgGet } from "./svg-pathes";
@Component({
    selector: "xlSvg,[xlSvg]",
    templateUrl: "./svg.component.html",
    styleUrls: ["./svg.component.scss"]
})
export class XlSvgComponent {
    pathes: string[] | null = null;
    @Input()
    public set xlSvg(icon: string | undefined | null) {
        if (typeof icon == "string") {
            const pathes = svgGet(icon);
            if (pathes) {
                this.pathes = pathes;
                return;
            }
        }
        this.pathes = null;
    }

    constructor() { }
}