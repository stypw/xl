import { Component } from '@angular/core';
import { title } from "@env";
import { EnvService } from "@env/env.service";
import { PathData } from "@stypw/xl/core";
import {
  xl_svg_zujian_danchuang,
  xl_svg_link1,
  xl_svg_program_code_full,
  xl_svg_tab1,
  xl_svg_a_Graphicad_Carousel_selected,
  xl_svg_loading,
  xl_svg_xiaoxi,
  xl_svg_notice,
  xl_svg_form1,
  xl_svg_tree7,
  xl_svg_jindutiao1,
  xl_svg_huakuai_,
  xl_svg_table,
  xl_svg_fenyeqi1,
  xl_svg_datepickerbt,
  xl_svg_color_correction,
  xl_svg_svg1,
  xl_svg_homepage,
  xl_svg_angular
} from "@stypw/xl/data";
export type Menu = {
  text: string;
  url: string;
  icon?: PathData[];
}

function defineMethod(target: any, fun: Function) {
  let init = Reflect.get(target, "ngOnInit");
  Reflect.set(target, "ngOnInit", function (this: any, ...args: any[]) {
    fun.call(this, ...args);
    init && init.call(this, ...args);
  });
}

function FormatValue(target: any, property: string, descriptor?: PropertyDescriptor) {
  let proxy: ProxyConstructor;
  defineMethod(target, function (this: any) {


    Reflect.set(this, property, {

    });
  });
}

@Component({
  selector: 'div[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss','./app.component-small.scss']
})
export class AppComponent {
  isOpen = false;
  showTest = false;
  homepageIcon = xl_svg_homepage;
  logIcon = xl_svg_angular;

  @FormatValue
  title = title;

  _name: string = "name";

  @FormatValue
  set name(v) {
    this._name = v;
  }
  get name() {
    return this._name;
  }

  menus: Menu[] = [
    { url: "start", text: "开始", icon: xl_svg_zujian_danchuang },
    { url: "anchor", text: "锚点", icon: xl_svg_link1 },
    { url: "wnd", text: "弹窗", icon: xl_svg_program_code_full },
    { url: "tab", text: "选项卡", icon: xl_svg_tab1 },
    { url: "carousel", text: "轮播", icon: xl_svg_a_Graphicad_Carousel_selected },
    { url: "loading", text: "加载", icon: xl_svg_loading },
    { url: "toast", text: "提示", icon: xl_svg_xiaoxi },
    { url: "notice", text: "通知", icon: xl_svg_notice },
    { url: "form", text: "表单", icon: xl_svg_form1 },
    { url: "tree", text: "树", icon: xl_svg_tree7 },
    { url: "process", text: "进度条", icon: xl_svg_jindutiao1 },
    { url: "slider", text: "滑块", icon: xl_svg_huakuai_ },
    { url: "table", text: "表格", icon: xl_svg_table },
    { url: "page", text: "分页", icon: xl_svg_fenyeqi1 },
    { url: "datetimepicker", text: "时间选择器", icon: xl_svg_datepickerbt },
    { url: "colorpicker", text: "颜色选择器", icon: xl_svg_color_correction },
    { url: "svg", text: "图片", icon: xl_svg_svg1 },
  ];
  ngOnInit() {
    this.title = this.title + 1;
    console.log(this.envService.baseUrl);
  }

  constructor(private envService: EnvService) { }
}
