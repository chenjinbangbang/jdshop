import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//引入config以及service
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {

  public list = []; //模拟商品数据
  public cid = ''; //获取分类id
  public page = 1; //分页

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServicesProvider) {

    //获取传值
    this.cid = this.navParams.get('cid');
    this.getProductList('');

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductlistPage');
  }

  getProductList(infiniteScroll){
    let api = 'api/plist?cid=' + this.cid + '&page=' + this.page;
    this.httpService.requestData(api,(data) => {
      //console.log(data);
      this.list = this.list.concat(data.result); //数据拼接

      if(infiniteScroll){
        //告诉ionic 每一页请求数据完成时调用
        infiniteScroll.complete();

        //没有数据停止上拉更新
        if(data.result.length < 10){
          infiniteScroll.enable(false);
        }

      }
      this.page++;
        
    });
  }

  //加载更多
  doLoadMore(infiniteScroll){
    console.log(infiniteScroll);
    this.getProductList(infiniteScroll);
  }

}
