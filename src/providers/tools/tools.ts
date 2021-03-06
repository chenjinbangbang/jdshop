import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { StorageProvider } from '../../providers/storage/storage';

import { Md5 } from "ts-md5/dist/md5";

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public http: Http,public storage:StorageProvider) {
    
  }

  getUserInfo(){
    let userinfo = this.storage.get('userinfo');
    if(userinfo){
      return userinfo;
    }else{
      return '';
    }
   
  }

  sign(json){
    

    // json = {
    //   age: 20,name: 'zhangsan'
    // };
    let tempArr = [];
    for(let attr in json){
      tempArr.push(attr);
    }
    //排序
    tempArr = tempArr.sort();

    let tempStr = '';
    for(let i=0;i<tempArr.length;i++){
      tempStr += tempArr[i]+json[tempArr[i]];
    }

    console.log(Md5.hashStr(tempStr));
    return Md5.hashStr(tempStr);
  }

}
