import { Routes } from "@angular/router";
import { CarouselComponent } from "./carousel/carousel.component";
import { ColorpickerComponent } from "./colorpicker/colorpicker.component";
import { ConversionComponent } from "./conversion/conversion.component";
import { DatetimepickerComponent } from "./datetimepicker/datetimepicker.component";
import { LoadingComponent } from "./loading/loading.component";
import { NoticeComponent } from "./notice/notice.component";
import { PageComponent } from "./page/page.component";
import { ProcessComponent } from "./process/process.component";
import { SliderComponent } from "./slider/slider.component";
import { StartComponent } from "./start/start.component";
import { SvgComponent } from "./svg/svg.component";
import { TabComponent } from "./tab/tab.component";
import { TableComponent } from "./table/table.component";
import { ToastComponent } from "./toast/toast.component";
import { TreeComponent } from "./tree/tree.component";
import { WndComponent } from "./wnd/wnd.component";
import { XlformComponent } from "./xlform/xlform.component";
export const routeComponents = [
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
    StartComponent,
    WndComponent,
    LoadingComponent,
    ToastComponent,
    NoticeComponent,
    SvgComponent,
    XlformComponent
];

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "start" },
    { path: "start", component: StartComponent },
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
    { path: "**", pathMatch: "full", redirectTo: "start" }
]