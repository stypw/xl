import { NgModule } from '@angular/core';
import { XlWndComponent } from "./wnd.component";
import { XlWndLimitCompoent } from "./wnd-limit/wnd-limit.compoent";

@NgModule({
  declarations: [XlWndComponent, XlWndLimitCompoent],
  exports: [XlWndComponent, XlWndLimitCompoent]
})
export class XlWndModule { }
