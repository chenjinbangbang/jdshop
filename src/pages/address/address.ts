import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';

import { HttpServicesProvider } from '../../providers/http-services/http-services';

//增加收货地址
import { AddaddressPage } from '../addaddress/addaddress';
//修改收货地址
import { EditaddressPage } from '../editaddress/editaddress';

//工具的服务
import { ToolsProvider } from '../../providers/tools/tools';

/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  public AddaddressPage = AddaddressPage;
  public EditaddressPage = EditaddressPage;
  public list = [];
  public userinfo = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServicesProvider,public alertCtrl: AlertController) {
    //this.tools.sign();
  }

  ionViewDidLoad() {

  }

  ionViewWillEnter(){
    this.userinfo = this.tools.getUserInfo();
    this.getAddressList();
  }

  //获取当前用户的收货地址
  getAddressList() {
    
    //签名
    let userinfo:any = this.userinfo;
    let json = {
      uid: userinfo._id,
      salt: userinfo.salt
    };
    let sign = this.tools.sign(json);

    //请求数据
    let api = 'api/addressList?uid=' + userinfo._id+'&sign='+sign;
    this.httpService.requestData(api,(data) => {
      console.log(data);
      if(data.success){
        this.list = data.result;
      }else{
        alert(data.message);
      }
    });

  }

  //改变收货地址
  changeAddress(id){

    let userinfo:any = this.userinfo;
    let json = {
      uid: userinfo._id,
      salt: userinfo.salt,
      id
    };
    let sign = this.tools.sign(json);

    //请求数据
    let api = 'api/changeDefaultAddress';
    this.httpService.doPost(api,{
      uid: userinfo._id,
      sign,
      id
    },data => {
      //console.log(data);
      if(data.success){
        this.navCtrl.pop();
      }else{
        alert(data.message);
      }
    });
  }

  //删除数据
  deleteAddress(key,id){
    let confirm = this.alertCtrl.create({
      title: '提示信息',
      message: '您确定要删除吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {}
        },
        {
          text: '确定',
          handler: () => {
            //console.log(key,id);

            //服务器删除
            this.deleteAddressAction(key,id);
          }
        }
      ]
    });
    confirm.present();
  }

  //服务器删除
  deleteAddressAction(key,id){
    let userinfo:any = this.userinfo;

    let json = {
      uid: userinfo._id,
      salt: userinfo.salt,
      id
    };

    let sign = this.tools.sign(json);

    //请求数据
    let api = 'api/deleteAddress';
    this.httpService.doPost(api,{
      uid: userinfo._id,
      sign,
      id
    },data => {
      //console.log(data);
      if(data.success){
        this.list.splice(key,1);
      }else{
        alert(data.message);
      }
    });
  }

  //编辑页面
  editAddress(item){
    this.navCtrl.push(EditaddressPage,{item});
  }

}
