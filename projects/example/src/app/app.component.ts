import { Component, Renderer2 } from '@angular/core';
export type Menu = {
  text: string;
  url: string;
}
@Component({
  selector: 'div[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen = true;
  svgKey = "loading";
  menus: Menu[] = [
    { url: "anchor", text: "锚点anchor" },
    { url: "wnd", text: "弹窗wnd" },
    { url: "tab", text: "选项卡tab" },
    { url: "carousel", text: "轮播carousel" },
    { url: "loading", text: "加载loading" },
    { url: "toast", text: "提示toast" },
    { url: "notice", text: "通知notice" },
    { url: "form", text: "表单form" },
    { url: "tree", text: "树tree" },
    { url: "process", text: "进度条process" },
    { url: "slider", text: "滑块slider" },
    { url: "table", text: "表格table" },
    { url: "page", text: "分页pagger" },
    { url: "datetimepicker", text: "时间选择器datepicker" },
    { url: "colorpicker", text: "颜色选择器colorpicker" },
    { url: "svg", text: "图片svg" },
  ]
  
}
