import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { XlModule, configMapToken, useXlMedia } from "@stypw/xl";
import { AppComponent } from './app.component';

import { routes, routeComponents, SetRouterTitleService } from "./app.routers.module";
import { appConfig } from "./config";
import { AnchorPageComponent } from './components/anchor-page/anchor-page.component';

@NgModule({
  declarations: [
    AppComponent,
    routeComponents,
    AnchorPageComponent
  ],
  imports: [
    BrowserModule,
    XlModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(routes)
  ],
  providers: [Title, SetRouterTitleService, { provide: configMapToken, useValue: appConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {
  static record = useXlMedia();
}
