import { Component } from '@angular/core';
import { MenuController, LoadingController } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})
export class HomePage {
	homeSlider: any;
	bestDeals: any;
	topBrands: any;
	cart: any;
	
	constructor(
		public menu: MenuController, 
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.homeSlider = this.bk.getHomeSlider();
		this.bestDeals = this.bk.getBestDeals();
		this.topBrands = this.bk.getTopBrands();
		this.cart = this.bk.getCart();
	}
	
	addToCart(formData) {
		let loading = this.loadingCtrl.create({content: 'Please wait...'});
		loading.present();
		let cartItem = this.bk.getCartItem(formData.urlKey);		
		cartItem.subscribe(data=>{
			if(data.$exists()) {
				let newQty = data.qty + formData.qty;
				let newTotal = newQty * formData.price;
				cartItem.update({'qty': newQty, 'rowTotal': newTotal});
			} else {
				formData.rowTotal = formData.qty * formData.price;
				cartItem.update(formData);
			}
			loading.dismiss();
		});
	}
	
	ionViewWillEnter(){
		this.menu.enable(true);
	}
}
