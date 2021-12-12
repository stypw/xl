import { Component } from '@angular/core';

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
  menus: Menu[] = [
    { url: "start", text: "开始" },
    { url: "wnd", text: "弹窗" },
    { url: "tab", text: "选项卡" },
    { url: "carousel", text: "轮播" },
    { url: "conversion", text: "内容切换" },
    { url: "loading", text: "加载" },
    { url: "toast", text: "提示" },
    { url: "notice", text: "通知" },
    { url: "form", text: "表单" },
    { url: "tree", text: "树" },
    { url: "process", text: "进度条" },
    { url: "slider", text: "滑块" },
    { url: "table", text: "表格" },
    { url: "page", text: "分页" },
    { url: "datetimepicker", text: "时间选择器" },
    { url: "colorpicker", text: "颜色选择器" }
  ]
}
