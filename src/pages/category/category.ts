import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//引入config以及service
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//商品列表页面
import { ProductlistPage } from '../productlist/productlist';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  public cateList = []; //左侧数据
  public recList = []; //右侧数据

  public leftCate = []; //左侧分类数据
  public rightCate = []; //右侧分类数据

  //商品列表页面
  public ProductlistPage = ProductlistPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServicesProvider) {

    

    //调用左侧分类数据
    this.getLeftCateData();

    //左侧模拟数据
    for(let i=0;i<10;i++){
      this.cateList.push(`分类${i}`);
    }
    //右侧的分类数据模拟
    for(let i=0;i<10;i++){
      this.recList.push({
        pic: 'assets/imgs/0' + i + '.jpg',
        title: '第' + i + '条'
      });
    }
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  //左侧分类数据
  getLeftCateData(){
    let api = 'api/pcate';
    this.httpService.requestData(api,(data) => {
      console.log(data);
      this.leftCate = data.result;

      //调用右侧分类
      this.getRightCateData(this.leftCate[0]['_id']);

    });
  }

  //右侧分类数据
  getRightCateData(pid){
    let api = 'api/pcate?pid=' + pid;
    this.httpService.requestData(api,(data) => {
      console.log(data);
      this.rightCate = data.result;
    });
  }

}
