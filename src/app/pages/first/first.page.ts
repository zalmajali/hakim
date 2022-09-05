import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform,NavController } from '@ionic/angular';
import {UsersService} from "../../services/users.service";
@Component({
  selector: 'app-first',
  templateUrl: './first.page.html',
  styleUrls: ['./first.page.scss'],
})
export class FirstPage implements OnInit {
  image:any;
  isThere:any = 1;
  returnData:any;
  operationResult:any;
  loadingShow:any = 0;
  constructor(private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService) {
    this.platform.backButton.subscribe(() =>{
    })
    this.storage.get('showFirstPage').then(showFirstPage=>{
      if(showFirstPage==1)
        this.navCtrl.navigateRoot('/home');
    });
  }

  ngOnInit() {
    this.usersService.imageHome().then(data=>{
      this.returnData = data;
      this.operationResult = this.returnData.Error.ErrorCode;
      this.image = this.returnData.Data.image;
    });
    setTimeout(() => {this.navCtrl.navigateRoot("/home");}, 4000);
  }
  functionHomePage(){
    this.storage.set('showFirstPage',1);
    this.navCtrl.navigateRoot("/home");
  }
}
