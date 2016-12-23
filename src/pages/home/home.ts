import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { ProductPage } from '../product/product';
import { BrandPage } from '../brand/brand';

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})
export class HomePage {
	cms: any;
	homeSlider: any;
	bestDeals: any;
	topBrands: any;
	cart: any;
	
	constructor(
		public menu: MenuController, 
		public nav: Nav,
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
		this.bk.addToCart(formData).subscribe(cartItem => {
			loading.dismiss();
		});
	}
	
	goToProduct(code) {
		this.nav.push(ProductPage, {'filter': {'product': code}});
	}
	
	ionViewWillEnter(){
		this.menu.enable(true);
	}
	
	gotoBrand(code) {
		this.nav.push(BrandPage, {'filter': {'brand': code}});
	}
}
