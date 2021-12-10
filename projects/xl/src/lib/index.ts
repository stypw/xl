import { NgModule } from '@angular/core';
export * from "./http"
export * as tools from "./tools";
export * as mysql from "./mysql"
export * from "./binding";
export * from "./wnd";
export * from "./loading";
export * from "./svg";
export * from "./toast";
export * from "./notice";
import { XlNoticeModule } from "./notice";
import { XlToastModule } from "./toast";
import { XlSvgModule } from "./svg";
import { XlLoadingModule } from "./loading"
import { XlWndModule } from "./wnd";
import { XlBindingModule } from "./binding";


const modules = [
    XlNoticeModule,
    XlToastModule,
    XlSvgModule,
    XlBindingModule,
    XlWndModule,
    XlLoadingModule
];

@NgModule({
    exports: [...modules]
})
export class XlModule { }
