import { NgModule } from '@angular/core';
import { XlRealHeightDirective } from "./real-height.directive";
import { XlFoldDirective } from "./fold.directive";
@NgModule({
    declarations: [XlRealHeightDirective,XlFoldDirective],
    exports: [XlRealHeightDirective,XlFoldDirective]
})
export class XlRealHeightModule { }
