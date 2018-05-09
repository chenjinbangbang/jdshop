import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, AlertController } from 'ionic-angular';

//引入config以及service
import { ConfigProvider } from '../../providers/config/config';
import { HttpServicesProvider } from '../../providers/http-services/http-services';

//引入storage服务
import { StorageProvider } from '../../providers/storage/storage';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  public flag = false; //有没有关键词，关键词开关
  public keywords = ''; //搜索关键字
  public list = []; //模拟商品数据
  public page = 1; //当前页
  public hasData = true; //是否有数据
  public historyList = []; //历史记录的数据

  constructor(public navCtrl: NavController, public navParams: NavParams, public config: ConfigProvider, public httpService: HttpServicesProvider,public storage: StorageProvider,public alertCtrl: AlertController) {
    //获取历史记录
    this.getHistory();
  }

  //装饰器，回到顶部
  @ViewChild(Content) content: Content;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad SearchPage');
  }

  getSearchList(infiniteScroll){

    //点击搜索按钮
    if(!infiniteScroll){
      this.page = 1;
      this.hasData = true;
      this.content.scrollToTop(0); //回到顶部

      //保存历史记录
      this.saveHistory();
    }

    let api = 'api/plist?search=' + this.keywords + '&page=' + this.page;
    this.httpService.requestData(api,(data) => {
      console.log(data);

      //第一页时，替换数据
      if(this.page === 1){
        this.list = data.result;
      }else{
        this.list = this.list.concat(data.result); //拼接数据
      }
     
      this.flag = true; //显示商品列表

      if(infiniteScroll){
        //告诉ionic 每一页请求数据完成时调用
        infiniteScroll.complete();

        //没有数据停止上拉更新
        if(data.result.length < 10){
          this.hasData = false;
        }
        // if(data.result.length < 10){
        //   infiniteScroll.enable(false);
        // }
      }

      this.page++; 
 
    });
  }

  //加载更多
  doLoadMore(infiniteScroll){
    this.getSearchList(infiniteScroll);
  };

  //保存历史记录
  saveHistory(){
    //localStorage获取历史记录
    let history = this.storage.get('historyData');

    //判断历史记录存在不存在
    if(history){

      if(history.indexOf(this.keywords) === -1){
        history.push(this.keywords);
        //重新写入
        this.storage.set('historyData',history);
      }

    }else{
      this.historyList.push(this.keywords);
      //写入到localstorage
      this.storage.set('historyData',this.historyList);
    }
  }

  //获取历史记录 
  getHistory(){
    let history = this.storage.get('historyData');
    console.log(history);
    if(history){
      this.historyList = history;
    }
  }

  //点击历史记录执行的方法 
  goSearch(keywords){ 
    this.keywords = keywords;
    this.getSearchList('');
  }

  //删除历史记录
  removeHistory(keywords){

    //提示
    let confirm = this.alertCtrl.create({
      title: '您确定要删除吗？',
      message: '您确定要删除这条历史记录，确定点击是，否则点击否。',
      buttons: [
        {
          text: '否',
          handler: () => {

          }
        },
        {
          text: '是',
          handler: () => {
            let index = this.historyList.indexOf(keywords); //删除的索引
            
            this.historyList.splice(index,1);
            this.storage.set('historyData',this.historyList);
          }
        }
      ]
    });
    confirm.present();
  }
}
