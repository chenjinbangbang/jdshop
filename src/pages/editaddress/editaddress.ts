import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

//工具的服务
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the EditaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html',
})
export class EditaddressPage {

  public addressList = {
    name: '',
    phone: '',
    address: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider) {
  }

  ionViewDidLoad() {
    
  }

  ionViewWillEnter(){
    this.addressList = this.navParams.get('item');
  }

  editAddress() {

    if (this.addressList.name != '' || this.addressList.phone != '' || this.addressList.address != '') {
      //获取表单的内容
      let userinfo = this.tools.getUserInfo();

      let json = {
        id: this.addressList['_id'],
        uid: userinfo._id,
        salt: userinfo.salt,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address,
      };

      console.log(json);

      //生成签名
      let sign = this.tools.sign(json); 

      let api = 'api/editAddress';
      this.httpService.doPost(api,{
        id: this.addressList['_id'],
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
