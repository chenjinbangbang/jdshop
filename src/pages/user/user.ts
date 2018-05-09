import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

//登录
import { LoginPage } from '../login/login';
//注册
import { RegisterPage } from '../register/register';
//账户管理页面
import { PersonalPage } from '../personal/personal';

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  public LoginPage = LoginPage;
  public RegisterPage = RegisterPage;
  public PersonalPage = PersonalPage;

  public userinfo = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServicesProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    //判断用户有没有登录
    let userinfo = this.storage.get('userinfo');
    console.log(userinfo);
    if(userinfo && userinfo.username){
      this.userinfo = userinfo;
    }else{
      this.userinfo = '';
    }
  }

}
