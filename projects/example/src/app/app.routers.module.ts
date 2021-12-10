import { Routes } from "@angular/router";
import { LoadingComponent } from "./loading/loading.component";
import { NoticeComponent } from "./notice/notice.component";
import { StartComponent } from "./start/start.component";
import { SvgComponent } from "./svg/svg.component";
import { ToastComponent } from "./toast/toast.component";
import { WndComponent } from "./wnd/wnd.component";
export const routeComponents = [
    StartComponent,
    WndComponent,
    LoadingComponent,
    ToastComponent,
    NoticeComponent,
    SvgComponent
];

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "start", component: StartComponent },
    { path: "wnd", component: WndComponent },
    { path: "loading", component: LoadingComponent },
    { path: "toast", component: ToastComponent },
    { path: "svg", component: SvgComponent },
    { path: "notice", component: NoticeComponent },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]