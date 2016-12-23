import { Component } from '@angular/core';
import { MenuController, LoadingController } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'cart-page',
	templateUrl: 'cart.html'
})
export class CartPage {
	cart: any;
	
	constructor(
		public menu: MenuController, 
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.cart = this.bk.getCart();
	}
	
	deleteItem(code){		
		this.bk.deleteCartItem(code);
	}
}
