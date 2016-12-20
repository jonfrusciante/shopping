import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { CartPage } from '../../pages/cart/cart';

@Component({
	selector: '[add-to-cart]',
	templateUrl: 'add-to-cart.html'
})
export class AddToCart {
	cart: any;
	cartData: any;
	
	constructor(
		public menu: MenuController, 
		public nav: Nav,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.cart = this.bk.getCart();
		this.cart.subscribe(cartData => {this.cartData = cartData});
	}
	
	addToCart(formData) {
		let loading = this.loadingCtrl.create({content: 'Please wait...'});
		loading.present();
		let cartItem = this.bk.getCartItem(formData.sku);
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
}
