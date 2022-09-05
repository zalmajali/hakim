import { Component, OnInit,ViewChild } from '@angular/core';
import {MenuController, Platform, NavController,ToastController,ModalController,AlertController} from '@ionic/angular';
import {Storage} from "@ionic/storage";
import {StoresService} from "../../services/stores.service";
import { Network } from '@ionic-native/network/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {ActivatedRoute, Router} from '@angular/router';
import {IonSlides} from '@ionic/angular';
import { ContactinformationComponent } from '../contactinformation/contactinformation.component';
@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.page.html',
  styleUrls: ['./shoppingcart.page.scss'],
})
export class ShoppingcartPage implements OnInit {
  @ViewChild('slides',{static:false}) slides:IonSlides;
  productsStoreSkeleton:boolean = false;
  discount:any;
  returnProductAndStoreCartArray:any=[];
  address: string;
  latlong:any;
  locationName:any;
  number:any;
  numberBackUp:any;
  msg:any;
  productInCart:any = 2;
  message:any;
  userId : any;
  discountCode:any;
  operationResult:any;
  returnisSaveValues:any;
  selectPriceValues:any = 0;
  returnCheckDiscountCodeData:any;
  returnArrayCheckDiscountCode:any;
  returnArrayCheckDiscountCodeVal:any;
  fullNameLogin:any;
  emailLogin:any;
  constructor(private alertController:AlertController,private modalController: ModalController,private router:Router,private activaterouter:ActivatedRoute,private sqlite: SQLite,private network:Network,private menu:MenuController,private storage: Storage,private platform: Platform,private navCtrl: NavController,private storesService:StoresService,private toastCtrl: ToastController) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.storage.set('thisPageReturn', 'shoppingcart');
      this.storage.set('internetBack', '0');
      this.navCtrl.navigateRoot("/errors");
    });
  }
  async getTheOptions(event,index,id){
    let newPrice = 0;
    let oldPrice = 0;
    if(event.detail.value == 1){
      this.selectPriceValues = 1;
      oldPrice = parseFloat(this.returnProductAndStoreCartArray[index]['allPrice'])-parseFloat(this.returnProductAndStoreCartArray[index]['deliveryAnotherPrice']);
      newPrice = oldPrice+parseFloat(this.returnProductAndStoreCartArray[index]['deliveryPrices']);
    }else{
      this.selectPriceValues = 2;
      oldPrice = parseFloat(this.returnProductAndStoreCartArray[index]['allPrice'])-parseFloat(this.returnProductAndStoreCartArray[index]['deliveryPrices']);
      newPrice = oldPrice+parseFloat(this.returnProductAndStoreCartArray[index]['deliveryAnotherPrice']);
    }
    this.returnProductAndStoreCartArray[index]['allPrice'] = newPrice;
  }
  async functionReturnData(){
    this.returnProductAndStoreCartArray = [];
    this.productsStoreSkeleton = true;
    await this.sqlite.create({
      name: "arreb.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql(`select * FROM storesCart`, [])
        .then((resNew) =>{
          for(let i = 0; i < resNew.rows.length;i++){
            this.returnProductAndStoreCartArray[i] = [];
            this.returnProductAndStoreCartArray[i]['id'] = resNew.rows.item(i).id;
            this.returnProductAndStoreCartArray[i]['storeName'] = resNew.rows.item(i).storeName;
            this.returnProductAndStoreCartArray[i]['allPrice'] = parseFloat(resNew.rows.item(i).allPrice);
            this.returnProductAndStoreCartArray[i]['deliveryTime'] = resNew.rows.item(i).deliveryTime;
            this.returnProductAndStoreCartArray[i]['deliveryPrices'] = resNew.rows.item(i).deliveryPrices;
            this.returnProductAndStoreCartArray[i]['deliveryAnotherPrice'] = resNew.rows.item(i).deliveryAnotherPrice;
            this.returnProductAndStoreCartArray[i]['deliveryAnotherTime'] = resNew.rows.item(i).deliveryAnotherTime;
            this.returnProductAndStoreCartArray[i]['taxPrice'] = resNew.rows.item(i).taxPrice;
            this.returnProductAndStoreCartArray[i]['showLargValues'] = 1;
            this.returnProductAndStoreCartArray[i]['products'] = [];
            if(resNew.rows.item(i).deliveryAnotherPrice == 0 || resNew.rows.item(i).deliveryAnotherPrice == "" || resNew.rows.item(i).deliveryAnotherPrice == undefined){
              this.selectPriceValues = 1;
              this.returnProductAndStoreCartArray[i]['deliveryAnotherPrice'] = 0;
              this.returnProductAndStoreCartArray[i]['allPrice'] = parseFloat(resNew.rows.item(i).allPrice)+parseFloat(resNew.rows.item(i).deliveryPrices)+parseFloat(resNew.rows.item(i).taxPrice);
            }else{
              this.selectPriceValues = 2;
              this.returnProductAndStoreCartArray[i]['allPrice'] = parseFloat(resNew.rows.item(i).allPrice)+parseFloat(resNew.rows.item(i).deliveryAnotherPrice)+parseFloat(resNew.rows.item(i).taxPrice);
            }
            this.sqlite.create({
              name: "arreb.db",
              location: 'default'
            }).then((db: SQLiteObject) => {
              db.executeSql(`select * FROM productsCart where storeId= ?`, [resNew.rows.item(i).id])
                .then((resNewAdd) =>{
                  for(let j = 0; j < resNewAdd.rows.length;j++){
                    this.returnProductAndStoreCartArray[i]['products'][j] = [];
                    this.returnProductAndStoreCartArray[i]['products'][j]['id'] = resNewAdd.rows.item(j).id;
                    this.returnProductAndStoreCartArray[i]['products'][j]['storeId'] = resNewAdd.rows.item(j).storeId;
                    this.returnProductAndStoreCartArray[i]['products'][j]['productName'] = resNewAdd.rows.item(j).productName;
                    this.returnProductAndStoreCartArray[i]['products'][j]['price'] = resNewAdd.rows.item(j).price;
                    this.returnProductAndStoreCartArray[i]['products'][j]['additions'] = resNewAdd.rows.item(j).additions;
                    this.returnProductAndStoreCartArray[i]['products'][j]['options'] = resNewAdd.rows.item(j).options;
                    this.returnProductAndStoreCartArray[i]['products'][j]['ingredients'] = resNewAdd.rows.item(j).ingredients;
                    this.returnProductAndStoreCartArray[i]['products'][j]['quantity'] = resNewAdd.rows.item(j).quantity;
                    this.returnProductAndStoreCartArray[i]['products'][j]['image'] = resNewAdd.rows.item(j).image;
                    this.returnProductAndStoreCartArray[i]['products'][j]['type'] = resNewAdd.rows.item(j).type;
                    this.returnProductAndStoreCartArray[i]['products'][j]['showSmallValues'] = 1;
                  }
                }).catch(e => {this.productInCart = 0;});
            }).catch(e => {this.productInCart = 0;})
          }
          let countOfData = this.returnProductAndStoreCartArray.length;
          if(countOfData == 0)
            this.productInCart = 0;
          else {
            this.productInCart = 1;
          }
        }).catch(e => {this.productInCart = 0;});
    }).catch(e => {this.productInCart = 0;})
    setTimeout(()=>{
      this.productsStoreSkeleton = false
    },2000);

  }
  async ngOnInit() {
    this.productInCart = 0;
    this.number = await this.storage.get('numberInformation');
    this.numberBackUp = await this.storage.get('numberBackUpInformation');
    this.msg = await this.storage.get('msgInformation');
    this.address = await this.storage.get('addressmsgInformation');
    this.latlong = await this.storage.get('latitudeInformation')+","+await this.storage.get('longitudeInformation');
    await this.functionReturnData();
  }
  async contactInformation(){
    let model = await this.modalController.create({
      component:ContactinformationComponent,
      animated:true,
      cssClass:"modalFilterSortCss"
    });
    model.onDidDismiss().then(data=>{
     this.address = data.data.address;
      this.number = data.data.number;
      this.latlong = data.data.latlong;
      this.msg = data.data.msg;
      this.numberBackUp = data.data.numberBackUp;
    });
    await model.present();
  }
  functionQuantity(id:any,largIndex:any,smaillIndex:any,operationType:any){
    let storeCartId = this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['storeId']
    if(operationType == 1){
      let allPrice  = parseFloat(this.returnProductAndStoreCartArray[largIndex]['allPrice'])+parseFloat(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['price']);
      let allQuantity = parseInt(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity'])+1;
      this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity'] = allQuantity;
      this.returnProductAndStoreCartArray[largIndex]['allPrice'] = allPrice;
      this.sqlite.create({
        name: "arreb.db",
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql(`UPDATE storesCart SET allPrice='${allPrice}' where id=?`, [storeCartId])
          .then(() => {})
          .catch(e => {});
      }).catch(e => {});

      this.sqlite.create({
        name: "arreb.db",
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql(`UPDATE productsCart SET quantity='${allQuantity}' where id=?`, [id])
          .then(() => {})
          .catch(e => {});
      }).catch(e => {});
    }else{
      let allQuantity = parseInt(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity'])-1;
      if(allQuantity!=0){
        let allPrice  = parseFloat(this.returnProductAndStoreCartArray[largIndex]['allPrice'])-parseFloat(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['price']);
        this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity'] = allQuantity;
        this.returnProductAndStoreCartArray[largIndex]['allPrice'] = allPrice;
        this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity'] = allQuantity;
        this.returnProductAndStoreCartArray[largIndex]['allPrice'] = allPrice;

        this.sqlite.create({
          name: "arreb.db",
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql(`UPDATE storesCart SET allPrice='${allPrice}' where id=?`, [storeCartId])
            .then(() => {})
            .catch(e => {});
        }).catch(e => {});

        this.sqlite.create({
          name: "arreb.db",
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql(`UPDATE productsCart SET quantity='${allQuantity}' where id=?`, [id])
            .then(() => {})
            .catch(e => {});
        }).catch(e => {});
      }else{
        this.message = "عذرأ...لقد قمت بتحديد اقل كمية ممكنة من المنتج";
        this.displayResult(this.message);
      }
    }
  }
  async functionDeletePro(id:any,largIndex:any,smaillIndex:any,proType:any){
    let allPriceCalculate = parseInt(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['quantity']) * parseFloat(this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['price']);
    let allPrice  = parseFloat(this.returnProductAndStoreCartArray[largIndex]['allPrice'])-allPriceCalculate;
    this.returnProductAndStoreCartArray[largIndex]['allPrice'] = allPrice;
    this.returnProductAndStoreCartArray[largIndex]['products'][smaillIndex]['showSmallValues'] = 0;
    let checkPrice = 0;
    if(this.selectPriceValues == 1) {
      checkPrice = allPrice - parseFloat(this.returnProductAndStoreCartArray[largIndex]['deliveryPrices'])- parseFloat(this.returnProductAndStoreCartArray[largIndex]['taxPrice'])
    }
    if(this.selectPriceValues == 2) {
      checkPrice = allPrice - parseFloat(this.returnProductAndStoreCartArray[largIndex]['deliveryAnotherPrice'])- parseFloat(this.returnProductAndStoreCartArray[largIndex]['taxPrice'])
    }
    let idData = this.returnProductAndStoreCartArray[largIndex]['id'];
    if(checkPrice == 0){
      this.returnProductAndStoreCartArray[largIndex]['showLargValues'] = 0;
      this.sqlite.create({
        name: "arreb.db",
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM storesCart where id=?',[idData])
          .then(() => {
          })
          .catch(e => {});
      }).catch(e => {});
      await this.functionReturnData();
    }else{
      this.sqlite.create({
        name: "arreb.db",
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql(`UPDATE storesCart SET allPrice='${checkPrice}' where id=?`, [idData])
          .then(() => {})
          .catch(e => {});
      }).catch(e => {});
    }
    this.sqlite.create({
      name: "arreb.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM productsCart where id=? AND type=?',[id,proType])
        .then(() => {
        })
        .catch(e => {});
    }).catch(e => {});
    await this.functionReturnData();
    this.message = "تم إزالة المنتج من قائمة طلبات المتجر";
    this.displayResult(this.message);
  }
  async functionDeleteAll(id:any,index){
    this.returnProductAndStoreCartArray[index]['showLargValues'] = 0;
    this.sqlite.create({
      name: "arreb.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM productsCart where storeId=?',[id])
        .then(() => {
        })
        .catch(e => {});
    }).catch(e => {});
    this.sqlite.create({
      name: "arreb.db",
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM storesCart where id=?',[id])
        .then(() => {
        })
        .catch(e => {});
    }).catch(e => {});
    this.message = "تم إزالة الطلب من قائمة الطلبات";
    await this.functionReturnData();
    this.displayResult(this.message);
  }
  async checkValBeforAddValues(id:any,index:any,allValues:any){
    this.userId = await  this.storage.get('userId');
    if(this.userId!=null && this.userId !=undefined && this.userId!=0 && this.userId!=""){
      if(this.discountCode!="" && this.discountCode !="" && this.discountCode!=undefined){
        this.storesService.checkDiscountCode(this.discountCode,this.userId,allValues,id).then(data=>{
          this.returnCheckDiscountCodeData = data;
          this.operationResult = this.returnCheckDiscountCodeData.Error.ErrorCode;
          let message="";
          if(this.operationResult==1){
            this.returnArrayCheckDiscountCode = this.returnCheckDiscountCodeData.Error.ErrorNumber;
            this.returnArrayCheckDiscountCodeVal = this.returnCheckDiscountCodeData.Error.number;
            if(this.returnArrayCheckDiscountCode == 1)
              message = "كود الخصم المدخل غير صحيح او غير موجود و التكلفة الكلية هي "+allValues+" هل تريد المتابعة!";
            if(this.returnArrayCheckDiscountCode == 2)
              message = "كود الخصم المدخل غير صالح تم إستخدامه من قبل و التكلفة الكلية هي "+allValues+" هل تريد المتابعة!";
            if(this.returnArrayCheckDiscountCode == 3){
              allValues = this.returnArrayCheckDiscountCodeVal;
              message = "كود الخصم المدخل صحيح التكلفة الكلية الجديدة "+allValues+" هل تريد المتابعة!";
            }
          }else{
            message = "هناك مشكلة في النظام ولم يتم التحقق من كود الخصم و التكلفة الكلية هي "+allValues+" هل تريد المتابعة!";
          }
          this.alertDataReturn(id,index,allValues,message);
        });
      }else{
        this.addValuesToServer(id,index);
      }
    }else{
      this.message = "لاتمام عملية الشراء من التطبيق يرجى تسجيل الدخول على حسابك";
      this.displayResult(this.message);
    }
  }
async alertDataReturn(id:any,index:any,allValues:any,message:any){
  let alert = await this.alertController.create({
    cssClass: 'alertBac',
    mode: 'ios',
    message: message,
    buttons: [
      {
        text: 'لا',
        cssClass: 'alertButton',
        handler: () => {
        }
      }, {
        text: 'نعم',
        cssClass: 'alertButton',
        handler: () => {
          this.addValuesToServer(id,index);
        }
      }
    ]
  });
  await alert.present();
}
  async addValuesToServer(id:any,index:any){
    if(this.selectPriceValues != 0){
      this.userId = await  this.storage.get('userId');
      if(this.userId!=null && this.userId !=undefined && this.userId!=0 && this.userId!=""){
        await this.sqlite.create({
          name: "arreb.db",
          location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql(`select * FROM storesCart where id=?`, [id])
            .then((resNew) =>{
              for(let i = 0; i < resNew.rows.length; i++){
                let allPriceGetVal = resNew.rows.item(i).allPrice;
                let time = resNew.rows.item(i).deliveryTime;
                if(this.selectPriceValues == 1){
                  allPriceGetVal = parseFloat(resNew.rows.item(i).allPrice)+parseFloat(resNew.rows.item(i).deliveryPrices)+parseFloat(resNew.rows.item(i).taxPrice);
                  time = resNew.rows.item(i).deliveryTime;
                }
                else if(this.selectPriceValues == 2){
                  allPriceGetVal = parseFloat(resNew.rows.item(i).allPrice)+parseFloat(resNew.rows.item(i).deliveryAnotherPrice)+parseFloat(resNew.rows.item(i).taxPrice);
                  time = resNew.rows.item(i).deliveryAnotherTime;
                }
                let allPrice =allPriceGetVal;
                if(this.discountCode!="" && this.discountCode !="" && this.discountCode!=undefined) {
                  this.storesService.checkDiscountCode(this.discountCode, this.userId, allPriceGetVal,resNew.rows.item(i).id).then(data => {
                    this.returnCheckDiscountCodeData = data;
                    this.operationResult = this.returnCheckDiscountCodeData.Error.ErrorCode;
                    if (this.operationResult == 1) {
                      if (this.returnArrayCheckDiscountCode == 3) {
                        allPrice = this.returnCheckDiscountCodeData.Error.number;
                      }
                    }
                  });
                }
                if(this.number!="" && this.number!=null && this.number!=0 && this.number!=undefined && this.latlong!="" && this.latlong!=null && this.latlong!=0 && this.latlong!=undefined && this.address!="" && this.address!=null && this.address!=undefined){
                  this.storesService.addOrdersCart(this.userId,resNew.rows.item(i).id,allPrice,this.discountCode,this.number,this.numberBackUp,this.latlong,this.address,this.msg,time).then(data=>{
                    this.returnisSaveValues = data;
                    this.operationResult = this.returnisSaveValues.Error.ErrorCode;
                    let orderId = this.returnisSaveValues.Error.insertId;
                    let storeIdFromDb = resNew.rows.item(i).id;
                    if(this.operationResult==1){
                      let values = 0;
                      this.sqlite.create({
                        name: "arreb.db",
                        location: 'default'
                      }).then((db: SQLiteObject) => {
                        db.executeSql(`select * FROM productsCart where storeId= ?`, [storeIdFromDb])
                          .then((resNewAdd) =>{
                            for(let j = 0; j < resNewAdd.rows.length;j++){
                              this.storesService.addProductToOrderCart(orderId,resNewAdd.rows.item(j).storeId,resNewAdd.rows.item(j).id,resNewAdd.rows.item(j).additions,resNewAdd.rows.item(j).ingredients,resNewAdd.rows.item(j).options,resNewAdd.rows.item(j).price,resNewAdd.rows.item(j).quantity,resNewAdd.rows.item(j).type).then(data=>{
                                this.returnisSaveValues = data;
                                this.operationResult = this.returnisSaveValues.Error.ErrorCode;
                                if(this.operationResult==1) {
                                  values++;
                                }
                              });
                            }
                            if(values!=0){
                              this.returnProductAndStoreCartArray[index]['showLargValues'] = 0;
                              this.sqlite.create({
                                name: "arreb.db",
                                location: 'default'
                              }).then((db: SQLiteObject) => {
                                db.executeSql('DELETE FROM productsCart where storeId=?',[id])
                                  .then(() => {
                                  })
                                  .catch(e => {});
                              }).catch(e => {});
                              this.sqlite.create({
                                name: "arreb.db",
                                location: 'default'
                              }).then((db: SQLiteObject) => {
                                db.executeSql('DELETE FROM storesCart where id=?',[id])
                                  .then(() => {
                                  })
                                  .catch(e => {});
                              }).catch(e => {});
                              this.message = "طلبك قيد المتابعة للتحقق من حالة طلبك يرجى الانتقال الى قائمة طلباتي";
                              this.displayResult(this.message);
                            }
                          }).catch(e => {});
                      }).catch(e => {})
                      this.functionReturnData();
                    }else if(this.operationResult==2){
                      this.message = "لم تتم المحاولة بنجاح...البيانات فارغة";
                      this.displayResult(this.message);
                    }else{
                      this.message = "لم تتم المحاولة بنجاح...حاول مرة أخرى";
                      this.displayResult(this.message);
                    }
                  });
                }else{
                  this.message = "لاتمام عملية الشراء من التطبيق يرجى تحديد معلومات التوصيل";
                  this.displayResult(this.message);
                }
              }
            }).catch(e => {});
        }).catch(e => {});
      }else{
        this.message = "لاتمام عملية الشراء من التطبيق يرجى تسجيل الدخول على حسابك";
        this.displayResult(this.message);
      }
    }else{
      this.message = "لاتمام عملية الشراء من التطبيق يرجى تسجيل الدخول على حسابك";
      this.displayResult(this.message);
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
  openSearchPage(){
    this.navCtrl.navigateRoot("/search");
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
  slidePrev() {
    this.slides.slidePrev();
  }
  slideNext() {
    this.slides.slideNext();
  }
}
