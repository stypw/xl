import { NgModule } from '@angular/core';
import { XlWndComponent } from "./wnd.component";
import { XlWndlimitCompoent } from "./wnd-limit/wnd-limit.compoent";

@NgModule({
  declarations: [XlWndComponent, XlWndlimitCompoent],
  exports: [XlWndComponent, XlWndlimitCompoent]
})
export class XlWndModule { }
