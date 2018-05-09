import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

//工具的服务
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

  public addressList = {
    name: '',
    phone: '',
    address: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider) {
  }

  ionViewDidLoad() {

  }

  addAddress() {

    if (this.addressList.name != '' || this.addressList.phone != '' || this.addressList.address != '') {
      //获取表单的内容
      let userinfo = this.tools.getUserInfo();

      let json = {
        uid: userinfo._id,
        salt: userinfo.salt,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address,
      };

      //生成签名
      let sign = this.tools.sign(json); 

      let api = 'api/addAddress';
      this.httpService.doPost(api,{
        uid: userinfo._id,
        sign,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address
      },(data) => {
        if(data.success){
          this.navCtrl.pop();
        }else{
          alert(data.message);
        }
      });

    }else{
      alert('收货地址不对');
    }

  }

}
