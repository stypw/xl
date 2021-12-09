import { NgModule } from '@angular/core';
export * from "./http"
export * as tools from "./tools";
export * as mysql from "./mysql"
export * from "./binding";
export * from "./wnd";
export * from "./loading"
import { XlLoadingModule } from "./loading"
import { XlWndModule } from "./wnd";
import { XlBindingModule } from "./binding";


const modules = [XlBindingModule, XlWndModule, XlLoadingModule];

@NgModule({
    declarations: [],
    imports: [...modules],
    exports: [...modules]
})
export class XlModule { }
