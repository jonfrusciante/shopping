import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { CartPage } from '../../pages/cart/cart';

@Component({
	selector: '[top-links]',
	templateUrl: 'top-links.html'
})
export class TopLinks {
	cart: any;
	cartData: any;
	
	constructor(
		public menu: MenuController, 
		public nav: Nav,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.cart = this.bk.getCart();
		if(this.cart) {
			this.cart.subscribe(cartData => {this.cartData = cartData});
		}
	}
	
	getCartItemsCount() {
		return this.cartData ? Object.keys(this.cartData.items).length : 0;
	}
	
	getCartItemsQty() {
		let totalQty = 0;
		if(this.cartData && this.cartData.items){
			let items = this.cartData.items;
			Object.keys(items).forEach(function(key) {
				let item = items[key];
				totalQty = totalQty + item.qty;
			});
		}
		return totalQty;
	}
	
	goTo(page, params) {
		this.menu.close();
		switch (page) {
			case 'cart':
            {
                this.nav.push(CartPage, params);
				break;
            }
		}		
	}
}
