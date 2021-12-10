import { Component } from '@angular/core';
import { IXlNotice } from '@stypw/xl';

@Component({
  selector: 'div[router-notice]',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent{

  notice:IXlNotice = IXlNotice.create();

  addNotice(){
    this.notice.add({title:"HelloWorld",content:"测试测试测试测试测试测试测试测  测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试 试测试测试测试测试测试测试测试测试测试测试   测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",time:new Date()})
  }
  showNotice(){
    this.notice.show();
  }
  hideNotice(){
    this.notice.hide();
  }
}
