import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { XlModule } from "@stypw/xl";

import { routes, routeComponents } from "./components.routers.module";


@NgModule({
  declarations: routeComponents,
  imports: [
    CommonModule,
    XlModule,
    FormsModule,
    RouterModule,
    RouterModule.forChild(routes)
  ],
})
export class ComponentsModule { }
