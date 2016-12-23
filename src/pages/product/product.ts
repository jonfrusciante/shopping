import { Component } from '@angular/core';
import { LoadingController, Nav, NavParams } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'product',
	templateUrl: 'product.html'
})
export class ProductPage {
	filter: any;
	product: any;
	
	constructor(
		public nav: Nav,
		public navParams: NavParams,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.filter = navParams.get('filter');
		this.product = this.bk.getProduct(this.filter.product);
	}
	
	addToCart(formData) {console.log(formData);
		/*let loading = this.loadingCtrl.create({content: 'Please wait...'});
		loading.present();
		this.bk.addToCart(formData).subscribe(cartItem => {
			loading.dismiss();
		});*/
	}
}
