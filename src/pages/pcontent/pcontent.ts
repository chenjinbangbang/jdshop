import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//引入config以及service
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

import { StorageProvider } from '../../providers/storage/storage';
//购物车页面
import { CartPage } from '../cart/cart';

/**
 * Generated class for the PcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pcontent',
  templateUrl: 'pcontent.html',
})
export class PcontentPage {

  @ViewChild('myattr') myattr: ElementRef;

  public CartPage = CartPage;

  public tabs = 'plist'; //商品列表选中
  public item = []; //商品列表
  public num = 1; //商品数量
  public carts_num = 0; //购物车数量

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServicesProvider,public storage:StorageProvider) {
    let id = this.navParams.data.id;
    this.requestData(id);

    //获取购物车数量 
    this.carts_num = this.getCartsNum();

  }

  ionViewDidLoad() {
    this.bindEvent();
  }

  requestData(id) {
    let api = 'api/pcontent?id=' + id;
    this.httpService.requestData(api, (data) => {
      //console.log(data); 
      this.item = data.result;
    });
  }

  //绑定事件的方法
  bindEvent() {
    //console.log(this.myattr.nativeElement);
    let attrDom = this.myattr.nativeElement;
    attrDom.onclick = function (e) {
      if (e.srcElement.nodeName == "SPAN") {
        let ele: any = e.target; //获取点击的元素
        let parentNode = ele.parentNode; //获取当前元素的父节点
        let children = parentNode.children; //获取父节点下面的所有子节点，去掉空白节点
        //console.log(children);

        for (let i = 0; i < children.length; i++) {
          children[i].className = '';
        }
        ele.className = 'active';
      }
    }
  }

  //加入购物车
  addCart() {
    let product_title = this.item['title'];
    let product_id = this.item['_id'];
    let product_pic = this.item['pic'];
    let product_price = this.item['price'];
    let product_count = this.num;

    let product_attr = '';
    let attrDom = this.myattr.nativeElement;
    let activeDom = attrDom.querySelectorAll('.active');
    //console.log(activeDom);
    for(let i=0;i<activeDom.length;i++){
      product_attr+=activeDom[i].innerHTML;
    }

    let json = {
      product_title,product_id,product_pic,product_price,product_count,product_attr
    };

    //console.log(json);

    //加入购物车保存到localstorage，如果存在，当前数量+1，如果不存在则写入
    let storageData = this.storage.get('carts_data');
    if(storageData){
      //判断购物车里面有没有当前这条数据
      if(this.hasData(storageData,json.product_id)){ //购物车有数据
        //修改刚才购物车里面的数量
        for(let i=0;i<storageData.length;i++){
          if(storageData[i].product_id==product_id){
            storageData[i].product_count+=1; //数量加1
          }
        } 
      }else{ //购物车没有数据
        storageData.push(json);
      }

      //重新写入
      this.storage.set('carts_data',storageData);

      this.carts_num+=1;

    }else{
      let tempArr = [];
      tempArr.push(json);
      this.storage.set('carts_data',tempArr);
    }

  }

  //增加数量
  incNum() {
    this.num += 1;
  }

  //减少数量
  decNum() {
    if (this.num > 1) {
      this.num -= 1;
    }
  }

  //判断购物车有没有数据
  hasData(storageData,product_id){
    if(storageData){
      for(let i=0;i<storageData.length;i++){
        if(storageData[i].product_id == product_id){
          if(storageData[i].product_id == product_id){
            return true;
          }
        }
      }
    }
    return false;
  }

  //获取购物车数量
  getCartsNum(){
    let num = 0;
    let storageData = this.storage.get('carts_data');
    if(storageData){
      for(let i=0;i<storageData.length;i++){
        num+=storageData[i].product_count;
      }
    }
    
    return num;
  }

}
