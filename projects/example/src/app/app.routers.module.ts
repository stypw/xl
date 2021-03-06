import { ActivatedRouteSnapshot, CanActivate, Routes } from "@angular/router";
import { CarouselComponent } from "./components/carousel/carousel.component";
import { ColorpickerComponent } from "./components/colorpicker/colorpicker.component";
import { ConversionComponent } from "./components/conversion/conversion.component";
import { DatetimepickerComponent } from "./components/datetimepicker/datetimepicker.component";
import { LoadingComponent } from "./components/loading/loading.component";
import { NoticeComponent } from "./components/notice/notice.component";
import { PageComponent } from "./components/page/page.component";
import { ProcessComponent } from "./components/process/process.component";
import { SliderComponent } from "./components/slider/slider.component";
import { SvgComponent } from "./components/svg/svg.component";
import { TabComponent } from "./components/tab/tab.component";
import { TableComponent } from "./components/table/table.component";
import { ToastComponent } from "./components/toast/toast.component";
import { TreeComponent } from "./components/tree/tree.component";
import { WndComponent } from "./components/wnd/wnd.component";
import { XlformComponent } from "./components/xlform/xlform.component";
import { AnchorComponent } from "./components/anchor/anchor.component";
import { StartComponent } from "./components/start/start.component";
import { Inject, Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { title } from "@env";

export const routeComponents = [
    StartComponent,
    AnchorComponent,
    CarouselComponent,
    ColorpickerComponent,
    ConversionComponent,
    DatetimepickerComponent,
    PageComponent,
    ProcessComponent,
    SliderComponent,
    TabComponent,
    TableComponent,
    TreeComponent,
    WndComponent,
    LoadingComponent,
    ToastComponent,
    NoticeComponent,
    SvgComponent,
    XlformComponent
];

@Injectable()
export class SetRouterTitleService implements CanActivate {
    canActivate(
        route: ActivatedRouteSnapshot
    ) {
        let t = route.data["title"];
        this.titleService.setTitle(`${title}-${t || ''}`);
        return true;
    }
    constructor(private titleService: Title) { }
}

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "start", component: StartComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "wnd", component: WndComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "loading", component: LoadingComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "toast", component: ToastComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "svg", component: SvgComponent, canActivate: [SetRouterTitleService], data: { title: "svg??????" } },
    { path: "notice", component: NoticeComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "form", component: XlformComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "tab", component: TabComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "carousel", component: CarouselComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "conversion", component: ConversionComponent, canActivate: [SetRouterTitleService], data: { title: "????????????" } },
    { path: "tree", component: TreeComponent, canActivate: [SetRouterTitleService], data: { title: "???" } },
    { path: "process", component: ProcessComponent, canActivate: [SetRouterTitleService], data: { title: "?????????" } },
    { path: "slider", component: SliderComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "table", component: TableComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "page", component: PageComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "datetimepicker", component: DatetimepickerComponent, canActivate: [SetRouterTitleService], data: { title: "???????????????" } },
    { path: "colorpicker", component: ColorpickerComponent, canActivate: [SetRouterTitleService], data: { title: "???????????????" } },
    { path: "anchor", component: AnchorComponent, canActivate: [SetRouterTitleService], data: { title: "??????" } },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]