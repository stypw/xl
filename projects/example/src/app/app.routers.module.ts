import { Routes } from "@angular/router";
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
export const routeComponents = [
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

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "wnd", component: WndComponent },
    { path: "loading", component: LoadingComponent },
    { path: "toast", component: ToastComponent },
    { path: "svg", component: SvgComponent },
    { path: "notice", component: NoticeComponent },
    { path: "form", component: XlformComponent },
    { path: "tab", component: TabComponent },
    { path: "carousel", component: CarouselComponent },
    { path: "conversion", component: ConversionComponent },
    { path: "tree", component: TreeComponent },
    { path: "process", component: ProcessComponent },
    { path: "slider", component: SliderComponent },
    { path: "table", component: TableComponent },
    { path: "page", component: PageComponent },
    { path: "datetimepicker", component: DatetimepickerComponent },
    { path: "colorpicker", component: ColorpickerComponent },
    { path: "anchor", component: AnchorComponent },
    { path: "**", pathMatch: "full", redirectTo: "start" }
]