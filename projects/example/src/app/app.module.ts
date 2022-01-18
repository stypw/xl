import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { XlModule, setSmallQuery, showToast } from "@stypw/xl/ui";
import { AppComponent } from './app.component';

import { routes, routeComponents, SetRouterTitleService } from "./app.routers.module";
import { AnchorPageComponent } from './components/anchor-page/anchor-page.component';

const media = window.matchMedia(`screen and (max-width:768px)`);
setSmallQuery(media);

import { EnvService,EnvExService } from "@env/env.service";
export const envService: EnvService = new EnvService();
envService.baseUrl = "customBase";
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
  providers: [Title, SetRouterTitleService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
