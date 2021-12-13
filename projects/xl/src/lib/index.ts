import { NgModule } from '@angular/core';
export * from "./types/types";
export * from "./http"
export * as tools from "./tools";
export * as mysql from "./mysql"
export * from "./binding";
export * from "./wnd";
export * from "./loading";
export * from "./svg";
export * from "./toast";
export * from "./notice";
export * from "./form";
export * from "./conversion/carousel";
export * from "./conversion/tab";

import { XlTabModule } from "./conversion/tab";
import { XlCarouselModule } from "./conversion/carousel";
import { XlFormModule } from "./form";
import { XlNoticeModule } from "./notice";
import { XlToastModule } from "./toast";
import { XlSvgModule } from "./svg";
import { XlLoadingModule } from "./loading"
import { XlWndModule } from "./wnd";
import { XlBindingModule } from "./binding";


const modules = [
    XlTabModule,
    XlCarouselModule,
    XlNoticeModule,
    XlToastModule,
    XlSvgModule,
    XlBindingModule,
    XlWndModule,
    XlLoadingModule,
    XlFormModule
];

@NgModule({
    exports: [...modules]
})
export class XlModule { }
