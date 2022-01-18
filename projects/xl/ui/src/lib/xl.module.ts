import { NgModule } from '@angular/core';

export * from "./binding";
export * from "./wnd";
export * from "./loading";
export * from "./toast";
export * from "./notice";
export * from "./form";
export * from "./conversion/carousel";
export * from "./conversion/tab";
export * from "./tree";
export * from "./fold";
export * from "./process";
export * from "./slider";
export * from "./link";
export * from "./anchor";
export * from "./pagger";
export * from "./datepicker";
export * from "./colorpicker";
export * from "./repeat";
export * from "./recursion";
export * from "./table";
export * from "./menu-switch";
export * from "./media";
export * from "./event-once";
export * from "./svg";
import { XlSvgModule } from "./svg";
import { XlEventOnceModule } from "./event-once"; 
import { XlMediaModule } from "./media";
import { XlMenuSwitchModule } from "./menu-switch";
import { XlTableModule } from "./table";
import { XlRecursionModule } from "./recursion";
import { XlRepeatModule } from "./repeat";
import { XlColorpickerModule } from "./colorpicker";
import { XlDatepickerModule } from "./datepicker";
import { XlPaggerModule } from "./pagger";
import { XlAnchorModule } from "./anchor";
import { XlLinkModule } from "./link";
import { XlSilderModule } from "./slider";
import { XlProcessModule } from "./process";
import { XlFoldModule } from "./fold";
import { XlTreeModule } from "./tree";
import { XlTabModule } from "./conversion/tab";
import { XlCarouselModule } from "./conversion/carousel";
import { XlFormModule } from "./form";
import { XlNoticeModule } from "./notice";
import { XlToastModule } from "./toast";
import { XlLoadingModule } from "./loading"
import { XlWndModule } from "./wnd";
import { XlBindingModule } from "./binding";


const modules = [
    XlSvgModule,
    XlEventOnceModule,
    XlMediaModule,
    XlMenuSwitchModule,
    XlTableModule,
    XlRecursionModule,
    XlRepeatModule,
    XlColorpickerModule,
    XlDatepickerModule,
    XlPaggerModule,
    XlAnchorModule,
    XlLinkModule,
    XlSilderModule,
    XlProcessModule,
    XlFoldModule,
    XlTreeModule,
    XlTabModule,
    XlCarouselModule,
    XlNoticeModule,
    XlToastModule,
    XlBindingModule,
    XlWndModule,
    XlLoadingModule,
    XlFormModule
];

@NgModule({
    exports: [...modules]
})
export class XlModule { }
