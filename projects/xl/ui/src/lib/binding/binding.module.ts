import { NgModule } from '@angular/core';

import { XlBindingDirective } from "./binding.directive";

export const directives = [
  XlBindingDirective
];
export const components = [

];

@NgModule({
  declarations: [XlBindingDirective],
  imports: [],
  exports: [XlBindingDirective]
})
export class XlBindingModule { }
