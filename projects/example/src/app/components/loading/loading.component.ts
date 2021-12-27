import { Component } from "@angular/core";
import { IXlLoading } from "@stypw/xl";

@Component({
    selector: "div[router-loading]",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent {
    loading:IXlLoading = IXlLoading.create();
    doTest(){
        this.loading.show("Hello World");
    }
 }