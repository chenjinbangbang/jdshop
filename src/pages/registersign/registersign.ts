import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

//注册密码
import { RegisterpasswordPage } from '../registerpassword/registerpassword';

/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {

  public code = ''; //验证码
  public isShowSend = false; //是否显示发送验证码的按钮
  public num = 10; //倒计时的数量
  public tel = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
    this.tel = this.storage.get("reg_tel"); //获取电话号码
  }

  ionViewDidLoad() {
    this.doTimer();
  }

  goRegisterpassword() {

    //验证验证码是否成功
    let api = 'api/validateCode';
    this.httpService.doPost(api, { tel: this.tel, code: this.code }, (result) => {
      console.log(result);
      if (result.success) {

        //保存验证码
        this.storage.set('reg_code',this.code);

        //跳转到下一个页面
        this.navCtrl.push(RegisterpasswordPage);
      } else {
        alert("验证码输入错误");
      }
    });
  }

  //倒计时的方法
  doTimer() {
    let timer = setInterval(() => {
      --this.num;
      if (this.num == 0) {
        clearInterval(timer);
        this.isShowSend = true;
      }
    }, 1000);
  }

  //发送验证码
  sendCode() {

    let api = 'api/sendCode';
    this.httpService.doPost(api, { tel: this.tel }, (result) => {
      console.log(result);
      if (result.success) {
        this.num = 10; //设置倒计时
        this.doTimer(); //倒计时
        this.isShowSend = false; //显示倒计时按钮
      } else {
        alert("发送验证码失败");
      }
    });

  }



}
