import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

//引入http和jsonp
import { HttpModule, JsonpModule } from '@angular/http';

//底部菜单
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//tabs页面
import { CategoryPage } from '../pages/category/category';
import { CartPage } from '../pages/cart/cart';
import { UserPage } from '../pages/user/user';
//登录
import { LoginPage } from '../pages/login/login';
//注册
import { RegisterPage } from '../pages/register/register';
import { RegistersignPage } from '../pages/registersign/registersign';
import { RegisterpasswordPage } from '../pages/registerpassword/registerpassword';
//搜索页面
import { SearchPage } from '../pages/search/search';
//商品列表
import { ProductlistPage } from '../pages/productlist/productlist';
//商品详情
import { PcontentPage } from '../pages/pcontent/pcontent';
//账户管理
import { PersonalPage } from '../pages/personal/personal';
//订单页面
import { OrderPage } from '../pages/order/order';
//收货地址列表
import { AddressPage } from '../pages/address/address';
//增加收货地址
import { AddaddressPage } from '../pages/addaddress/addaddress';
//修改收货地址
import { EditaddressPage } from '../pages/editaddress/editaddress';
//选择支付方式
import { PaymentPage } from '../pages/payment/payment';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartPage,
    CategoryPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    AddaddressPage,
    EditaddressPage,
    PaymentPage
  ],
  imports: [
    BrowserModule,
    HttpModule, JsonpModule,
    //IonicModule.forRoot(MyApp)
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: 'true', //隐藏全部子页面的tabs
      backButtonText: '' //配置返回按钮
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    CartPage,
    CategoryPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    AddaddressPage,
    EditaddressPage,
    PaymentPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConfigProvider,
    HttpServicesProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule { }
