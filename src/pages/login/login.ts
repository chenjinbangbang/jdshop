import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public history = '';
  public userinfo = { username: '', password: '' };

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
    this.history = this.navParams.get('history');
  }

  ionViewDidLoad() {

  }

  doLogin() {
    //console.log(this.userinfo);

    if (this.userinfo.username.length < 6) {
      alert('用户名不合法');
    } else {
      let api = 'api/doLogin';
      this.httpService.doPost(api, this.userinfo, (data) => {
        console.log(data);
        if(data.success){
          this.storage.set('userinfo',data.userinfo[0]);
          if(this.history == 'order'){
            this.navCtrl.pop(); //返回上一个页面
          }else{
            this.navCtrl.popToRoot(); //回到根页面
          }
        }else{
          alert(data.message)
        }
      });
    }
  }
}
