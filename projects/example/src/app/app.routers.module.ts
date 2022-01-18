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
    { path: "start", component: StartComponent, canActivate: [SetRouterTitleService], data: { title: "开始" } },
    { path: "wnd", component: WndComponent, canActivate: [SetRouterTitleService], data: { title: "弹窗" } },
    { path: "loading", component: LoadingComponent, canActivate: [SetRouterTitleService], data: { title: "加载" } },
    { path: "toast", component: ToastComponent, canActivate: [SetRouterTitleService], data: { title: "提示" } },
    { path: "svg", component: SvgComponent, canActivate: [SetRouterTitleService], data: { title: "svg图片" } },
    { path: "notice", component: NoticeComponent, canActivate: [SetRouterTitleService], data: { title: "消息" } },
    { path: "form", component: XlformComponent, canActivate: [SetRouterTitleService], data: { title: "表单" } },
    { path: "tab", component: TabComponent, canActivate: [SetRouterTitleService], data: { title: "标签" } },
    { path: "carousel", component: CarouselComponent, canActivate: [SetRouterTitleService], data: { title: "轮播" } },
    { path: "conversion", component: ConversionComponent, canActivate: [SetRouterTitleService], data: { title: "内容切换" } },
    { path: "tree", component: TreeComponent, canActivate: [SetRouterTitleService], data: { title: "树" } },
    { path: "process", component: ProcessComponent, canActivate: [SetRouterTitleService], data: { title: "进度条" } },
    { path: "slider", component: SliderComponent, canActivate: [SetRouterTitleService], data: { title: "滑块" } },
    { path: "table", component: TableComponent, canActivate: [SetRouterTitleService], data: { title: "表格" } },
    { path: "page", component: PageComponent, canActivate: [SetRouterTitleService], data: { title: "分页" } },
    { path: "datetimepicker", component: DatetimepickerComponent, canActivate: [SetRouterTitleService], data: { title: "时间选择器" } },
    { path: "colorpicker", component: ColorpickerComponent, canActivate: [SetRouterTitleService], data: { title: "颜色选择器" } },
    { path: "anchor", component: AnchorComponent, canActivate: [SetRouterTitleService], data: { title: "锚点" } },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]