import { Component, HostBinding, HostListener, Inject } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { svgSet, PathData, configMapToken } from "@stypw/xl";
export type Menu = {
  text: string;
  url: string;
  icon?: PathData[];
}
@Component({
  selector: 'div[app-root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isOpen = false;
  homepageIcon = svgSet.xl_svg_homepage;
  logIcon = svgSet.xl_svg_angular;
  title!: string;
  menus: Menu[] = [
    { url: "anchor", text: "锚点", icon: svgSet.xl_svg_link1 },
    { url: "wnd", text: "弹窗", icon: svgSet.xl_svg_program_code_full },
    { url: "tab", text: "选项卡", icon: svgSet.xl_svg_tab1 },
    { url: "carousel", text: "轮播", icon: svgSet.xl_svg_a_Graphicad_Carousel_selected },
    { url: "loading", text: "加载", icon: svgSet.xl_svg_loading },
    { url: "toast", text: "提示", icon: svgSet.xl_svg_xiaoxi },
    { url: "notice", text: "通知", icon: svgSet.xl_svg_notice },
    { url: "form", text: "表单", icon: svgSet.xl_svg_form1 },
    { url: "tree", text: "树", icon: svgSet.xl_svg_tree7 },
    { url: "process", text: "进度条", icon: svgSet.xl_svg_jindutiao1 },
    { url: "slider", text: "滑块", icon: svgSet.xl_svg_huakuai_ },
    { url: "table", text: "表格", icon: svgSet.xl_svg_table },
    { url: "page", text: "分页", icon: svgSet.xl_svg_fenyeqi1 },
    { url: "datetimepicker", text: "时间选择器", icon: svgSet.xl_svg_datepickerbt },
    { url: "colorpicker", text: "颜色选择器", icon: svgSet.xl_svg_color_correction },
    { url: "svg", text: "图片", icon: svgSet.xl_svg_svg1 },
  ]

  
  r: MediaQueryList | null = null;
  ngOnInit() {
    requestAnimationFrame(()=>{

    });
    requestIdleCallback(()=>{

    });
    this.title = this.map.get("title") || '';
    this.titleService.setTitle(this.title);
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.isOpen = false;
      }
    });
  }
  constructor(private titleService: Title, @Inject(configMapToken) private map: Map<string, string>, private router: Router) { }
}
