import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

//订单页面
import { OrderPage } from '../order/order';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  public list = [];
  public allPrice = 0; //总价
  public isChecked = false; //全选和反选
  public isEdit = false; //是否编辑
  public hasData = true; //是否有数据

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public storage: StorageProvider) {
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.getCartsData();

    //进来的时候判断有没有全选
    console.log(this.list.length);
    if (this.getCheckNum() == this.list.length && this.list.length > 0) {
      this.isChecked = true;

    } else {
      this.isChecked = false;

    }
  }

  getCartsData() {
    let cartsData = this.storage.get('carts_data');
    if (cartsData && cartsData.length > 0) {
      this.list = cartsData;
      this.hasData = true;
    } else {
      this.list = [];
      this.hasData = false;
    }
    this.sumPrice();
  }

  changeCarts() {

    if (this.getCheckNum() == this.list.length) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    this.sumPrice();
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

  //数量变化，双向数据绑定
  decCount(item) {
    if (item.product_count > 1) {
      --item.product_count;
    }
    this.sumPrice();
  }

  incCount(item) {
    ++item.product_count;
    this.sumPrice();
  }

  //离开的时候保存购物车数据
  ionViewWillLeave() {
    this.storage.set('carts_data', this.list);
  }

  //全选和反选
  checkAll() {
    console.log(this.isChecked);
    if (this.isChecked) { //全选
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked = false;
      }
      this.isChecked = false;
    } else { //反选
      for (let i = 0; i < this.list.length; i++) {
        this.list[i].checked = true;
      }
      this.isChecked = true;
    }
  }

  //获取选中的数量
  getCheckNum() {
    let sum = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        sum += 1;
      }
    }
    return sum;
  }

  //执行删除操作
  doDelete() {
    let noCheckedArr = [];
    for (let i = 0; i < this.list.length; i++) {
      if (!this.list[i].checked) {
        noCheckedArr.push(this.list[i]);
      }
    }
    //改变当前数据
    this.list = noCheckedArr;
    this.list.length > 0 ? this.hasData = true : this.hasData = false;

    //重新写入localsotrage
    this.storage.set('carts_data', noCheckedArr);
  }

  //去结算
  doPay() {
    //获取购物车选中的数据
    let tempArr = [];
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked) {
        tempArr.push(this.list[i]);
      }
    }

    //保存订单数据
    if (tempArr.length > 0) {
      this.storage.set('order_data', tempArr);
      this.navCtrl.push(OrderPage);
    }else{
      alert('您还没有选中数据');
    }


  }

}
