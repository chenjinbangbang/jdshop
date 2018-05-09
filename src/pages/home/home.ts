import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//引入config以及service
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//搜索页面
import { SearchPage } from '../search/search';

//商品详情页面
import { PcontentPage } from '../../pages/pcontent/pcontent';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public focusList = []; //轮播图
  public bestList = []; //精品推荐
  public bestListWidth = ''; //精品推荐数据长度
  public hotList = []; //热门商品
  public PcontentPage = PcontentPage; //商品详情页面

  constructor(public navCtrl: NavController, public config: ConfigProvider, public httpService: HttpServicesProvider) {

    //调用轮播图
    this.getFocus();
    //调用精品推荐
    this.getBestProduct();
    //调用热门商品
    this.getHotProduct();
  }

  //定义一个跳转到搜索页面的方法
  goSearch() {
    this.navCtrl.push(SearchPage);
  }

  //轮播图
  getFocus() {
    this.httpService.requestData('api/focus', (data) => {
      //console.log(11);
      this.focusList = data.result;
    });
  }

  //精品推荐
  getBestProduct() {
    this.httpService.requestData('api/plist?is_best=1', (data) => {
      //console.log(data);
      this.bestList = data.result;
      this.bestListWidth = this.bestList.length * 90 + 'px';
    });
  }

  //猜你喜欢
  getHotProduct() {
    this.httpService.requestData('api/plist?is_hot=1', (data) => {
      //console.log(data);
      this.hotList = data.result; 
    });
  }


}
