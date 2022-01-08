import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { XlModule, configMapToken } from "@stypw/xl";
import { AppComponent } from './app.component';

import { routes, routeComponents,SetRouterTitleService } from "./app.routers.module";
import { appConfig } from "./config";

@NgModule({
  declarations: [
    AppComponent,
    routeComponents
  ],
  imports: [
    BrowserModule,
    XlModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Title,SetRouterTitleService, { provide: configMapToken, useValue: appConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
