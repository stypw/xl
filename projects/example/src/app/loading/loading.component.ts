import { Component } from "@angular/core";

@Component({
    selector: "div[router-loading]",
    templateUrl: "./loading.component.html",
    styleUrls: ["./loading.component.scss"]
})
export class LoadingComponent {

    doTest(){
        console.log("hello World!");
    }
 }