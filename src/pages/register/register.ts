import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

//注册验证码
import { RegistersignPage } from '../registersign/registersign';



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  public tel = ""; //电话号码 

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RegisterPage');
  }

  //跳转到发送验证码
  goRegistersignPage() {
    console.log(this.tel);

    //电话号码是否合法的验证 
    if (/^\d{11}$/.test(this.tel)) {
      //注意：服务器要允许跨域
      let api = 'api/sendCode';
      this.httpService.doPost(api, { tel: this.tel }, (result) => {
        console.log(result);
        if (result.success) {
          this.storage.set("reg_tel", this.tel); //保存电话号码
          this.navCtrl.push(RegistersignPage); //跳转到下个页面，验证验证码
        } else {
          alert("发送验证码失败"+result.message);
        }
      });
    } else {
      alert("手机号码错误");
    }


  }

}
