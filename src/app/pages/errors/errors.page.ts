import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {Storage} from "@ionic/storage";
import { Network } from '@ionic-native/network/ngx';
@Component({
  selector: 'app-errors',
  templateUrl: './errors.page.html',
  styleUrls: ['./errors.page.scss'],
})
export class ErrorsPage implements OnInit {
  backToPage:any;
  constructor(private sqlite: SQLite,private network:Network,private navCtrl: NavController,private storage:Storage ) {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
    });
  }
  ngOnInit() {
    let connectSubscription = this.network.onConnect().subscribe(() => {
      this.storage.set('internetBack','1');
    });
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
      db.executeSql('DROP TABLE IF EXISTS banners')
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
  }
  async backToHomePage(){
    this.backToPage = await this.storage.get('thisPageReturn');
    if(this.backToPage == null || this.backToPage == undefined || this.backToPage == 0)
      this.navCtrl.navigateRoot("/home");
    else
      this.navCtrl.navigateRoot("/"+this.backToPage);
  }
}
