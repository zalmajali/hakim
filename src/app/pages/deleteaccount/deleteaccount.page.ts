import { Component, OnInit } from '@angular/core';
import {LoadingController, MenuController, NavController, Platform, ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {UsersService} from "../../services/users.service";
import { Network } from '@ionic-native/network/ngx';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.page.html',
  styleUrls: ['./deleteaccount.page.scss'],
})
export class DeleteaccountPage implements OnInit {
  number:any;
  errorNumber:any="";
  isErrorNumber:any = 1;
  password:any;
  errorPassword:any="";
  isErrorPassword:any = 1;
  isdisabled:boolean=true;
  backToPage:any;
  returnData:any;
  operationResult:any;
  message:any;
  loadingShow:any = 0;
  returnFullName:any;
  returnNumber:any;
  showPassword: boolean = false;
  showLoginWithApple:any = 0;
  facebookToken:any;
  facebookUserId:any;
  result:any;
  firstTime:any;
  lastTime:any;
  fullNameLogin:any;
  emailLogin:any;
  constructor(private http:HttpClient,private sqlite: SQLite,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private usersService:UsersService,private toastCtrl: ToastController,private loading: LoadingController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    this.platform.backButton.subscribeWithPriority(10, () => {
      this.navCtrl.navigateRoot("/login");
    });
  }
  async ngOnInit() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'))
      this.showLoginWithApple = 1;
    this.backToPage = await this.storage.get('internetBack');
    if(this.backToPage !='1'){
      this.navCtrl.navigateRoot("/errors");
    }
  }
  checkNumber(event){
    this.errorNumber = "succsessFiled";
    this.isErrorNumber = 1;
    this.number = event;
    if(this.number == "" || this.number == undefined){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
    }
    this.isEnterAllValues();
  }
  isEnterAllValues(){
    if(this.number != undefined && this.number != ""){
      this.isdisabled = true;
    }
  }
  deleteUser(){
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn','login');
      this.storage.set('internetBack','0');
      this.navCtrl.navigateRoot("/errors");
    });
    if(this.number == undefined || this.number == ""){
      this.errorNumber = "errorFiled";
      this.isErrorNumber = 0;
      this.isdisabled = false;
      return false;
    }
    this.loadingShow = 1;
    if(this.number != undefined){
      this.usersService.deleteUser(this.number).then(data=>{
        this.returnData = data;
        this.operationResult = this.returnData.Error.ErrorCode;
        if(this.operationResult==1){
          this.storage.remove('fullNameLogin');
          this.storage.remove('numberLogin');
          this.storage.remove('passwordLogin');
          this.storage.remove('emailLogin');
          this.storage.remove('userId');
          this.storage.remove('saveDataHome');
          this.storage.remove('selectedStoreVal');
          this.storage.remove('subCatStoreSelected');
          this.storage.remove('storeRegion');
          this.storage.remove('lastAllStoresSortSelect');
          this.storage.remove('homeCategories');
          this.storage.remove('selectedFavVal');
          this.storage.remove('subCatFavSelected');
          this.storage.remove('favRegion');
          this.storage.remove('lastAllFavSortSelect');
          this.storage.remove('typeShow');
          this.storage.remove('selectedSearchVal');
          this.storage.remove('subCatSearchSelected');
          this.storage.remove('searchRegion');
          this.storage.remove('lastAllSearchSortSelect');
          this.storage.remove('orderNumber');
          this.storage.remove('productName');
          this.storage.remove('storeName');
          this.storage.remove('priceFrom');
          this.storage.remove('priceTo');
          this.storage.remove('fromDate');
          this.storage.remove('toDate');
          this.storage.remove('status');
          this.storage.remove('selectValues');
          this.storage.remove('allStoresShow');
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS categories_home')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS offers')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS categories')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS stores')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS allstores')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS favouriteStores')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS searchStores')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS products')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS productsFields')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS branches')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS storesCategories')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS subCategories')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS categoriesAdditions')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS categoriesAdditionsOffer')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS additionsPro')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS optionsPro')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS ingredientsPro')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});

          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS additionsOffer')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS optionsOffer')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.sqlite.create({
            name: "arreb.db",
            location: 'default'
          }).then((db: SQLiteObject) => {
            db.executeSql('DROP TABLE IF EXISTS ingredientsOffer')
              .then(() => {})
              .catch(e => {});
          }).catch(e => {});
          this.loadingShow = 0;
          this.message = "تمت العملية بنجاح";
          this.displayResult(this.message);
          this.loadingShow = 0;
          this.navCtrl.navigateRoot("/home");
        }else if(this.operationResult==2){
          this.message = "لم تتم العملية بنجاح...البيانات فارغة";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }else if(this.operationResult==3){
          this.message = "لم تتم العملية بنجاح...رقم الجوال غير صحيح";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }else{
          this.message = "لم تتم العملية بنجاح...رقم الجوال غير صحيح";
          this.displayResult(this.message);
          this.loadingShow = 0;
        }
      }).catch(e=>{
        this.message = "لم تتم العملية بنجاح...حاول مرة اخرى";
        this.displayResult(this.message);
        this.loadingShow = 0;
      })
      this.isdisabled = true;
    }
  }
  async displayResult(message){
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
      position: 'bottom',
      cssClass:"toastStyle",
      color:""
    });
    await toast.present();
  }
  forgotPasssword(){
    this.navCtrl.navigateRoot("/forgotpasssword");
  }
  changeInputType(){
    this.showPassword = !this.showPassword;
  }
  functionGoToHome(){
    this.navCtrl.navigateRoot("/home");
  }
  functionGoToStores(){
    this.navCtrl.navigateRoot("/stores");
  }
  functionGoToShoppingcart(){
    this.navCtrl.navigateRoot("/shoppingcart");
  }
  async functionOpenMenue(){
    this.fullNameLogin = await this.storage.get('fullNameLogin');
    this.emailLogin = await this.storage.get('emailLogin');
    if(this.fullNameLogin!=null || this.emailLogin!=null) {
      this.menu.enable(true,"last");
      this.menu.open("last");
    }else{
      this.menu.enable(true,"first");
      this.menu.open("first");
    }
  }

}
