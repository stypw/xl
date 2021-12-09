import { Routes } from "@angular/router";
import { LoadingComponent } from "./loading/loading.component";
import { StartComponent } from "./start/start.component";
import { WndComponent } from "./wnd/wnd.component";
export const routeComponents = [
    StartComponent,
    WndComponent,
    LoadingComponent
];

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "start", component: StartComponent },
    { path: "wnd", component: WndComponent },
    { path: "loading", component: LoadingComponent },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]