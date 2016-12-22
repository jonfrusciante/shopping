import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { BrandPage } from '../brand/brand';
import { TopLinks } from '../../components/top-links/top-links';
import { Search } from '../../components/search/search';

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
	
	ionViewWillEnter(){
		this.menu.enable(true);
	}
	
	gotoBrand(code) {
		this.nav.push(BrandPage, {'filter': {'brand': code}});
	}
}
