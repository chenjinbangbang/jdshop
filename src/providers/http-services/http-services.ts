import { Http, Jsonp, Headers } from '@angular/http';
import { Injectable } from '@angular/core';

//引入config
import { ConfigProvider } from '../../providers/config/config';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

/*
  Generated class for the HttpServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServicesProvider {

  //设置post的格式
  private headers = new Headers({ "Content-Type": "application/json" });

  constructor(public http: Http, public jsonp: Jsonp, public config: ConfigProvider) {
    console.log('Hello HttpServicesProvider Provider');
  }

  requestData(apiUrl, callback) {

    let api = '';
    // if(apiUrl.indexOf('?') == -1){
    //   api = this.config.apiUrl + apiUrl + '?callback=JSONP_CALLBACK';
    // }else{
    //   api = this.config.apiUrl + apiUrl + '&callback=JSONP_CALLBACK';
    // }
    api = this.config.apiUrl + apiUrl;

    this.http.get(api).map(res => res.json()).subscribe((data) => {
      //console.log(data);
      callback(data);
    }, (err) => {
      console.log(err);
    });
  }

  doPost(apiUrl, json, callback) {
    let api = this.config.apiUrl + apiUrl;

    this.http.post(api, JSON.stringify(json), { headers: this.headers }).subscribe((res) => {
      callback(res.json());
    });

  }

}
