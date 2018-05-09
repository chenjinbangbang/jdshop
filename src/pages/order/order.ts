import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';
import { StorageProvider } from '../../providers/storage/storage';

//登录页面
import { LoginPage } from '../login/login';
//收货地址列表
import { AddressPage } from '../address/address';
//选择支付方式
import { PaymentPage } from '../payment/payment';

//工具服务
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public LoginPage = LoginPage;
  public AddressPage = AddressPage;
  public list = [];
  public userinfo = {};
  public address = {};
  public allPrice = 0; //总价
  public leaveWord = ''; //留言

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServicesProvider, public storage: StorageProvider, public tools: ToolsProvider) {

  }

  ionViewDidLoad() {

  }

  ionViewWillEnter() {
    //获取用户信息
    this.userinfo = this.tools.getUserInfo();

    //获取订单信息
    this.list = this.storage.get('order_data');

    //用户登录以后再获取收货地址
    if (this.userinfo) {
      this.getDefaultAddress();
    }

    //计算总价
    if (this.list) {
      this.sumPrice();
    }


  }

  ionViewDidEnter() {
    //获取订单信息
    //this.list = this.storage.get('order_data');
  }

  getDefaultAddress() {
    //获取签名
    let userinfo: any = this.userinfo;

    let json = {
      uid: userinfo['_id'],
      salt: userinfo.salt
    };

    let sign = this.tools.sign(json);

    //请求数据
    let api = 'api/oneAddressList?uid=' + userinfo['_id'] + '&sign=' + sign;
    this.httpService.requestData(api, data => {
      if (data.success) {
        //console.log(data.result);
        this.address = data.result[0];
      } else {

      }
    });
  }

  //提交订单
  goPayment() {
    console.log(this.userinfo);
    console.log(this.address);
    console.log(this.list);

    if(!this.userinfo){
      this.navCtrl.push('LoginPage',{history: 'order'});
    }else if(!this.address){
      alert('您还没有选择收货地址');
    }else{
      //提交订单
      let userinfo:any = this.userinfo;
      
      let uid:any = userinfo._id;
      let address:any = this.address['address'];
      let phone:any = this.address['phone'];
      let name:any = this.address['name'];
      let all_price = this.allPrice;
      let products:any = JSON.stringify(this.list);

      let json = {
        uid,
        salt: userinfo.salt,
        address,
        phone,
        name,
        all_price
      };

      let sign = this.tools.sign(json);

      //请求数据
      let api = 'api/doOrder';
      this.httpService.doPost(api,{
        uid,
        salt: userinfo.salt,
        address,
        phone,
        name,
        all_price,
        sign,
        products
      },data => {
        if(data.success){
          this.navCtrl.push(PaymentPage);
          console.log(data);
        }else{
          alert(data.message);
        }
      });

    }

  }

  //计算总价
  sumPrice() {
    let tempAllPrice = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        tempAllPrice += this.list[i].product_count * this.list[i].product_price;
      }
    }
    this.allPrice = tempAllPrice;
  }

}
