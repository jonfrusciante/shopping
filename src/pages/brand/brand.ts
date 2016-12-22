import { Component } from '@angular/core';
import { LoadingController, Nav, NavParams } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'brand',
	templateUrl: 'brand.html'
})
export class BrandPage {
	filter: any;
	brand: any;
	
	constructor(
		public nav: Nav,
		public navParams: NavParams,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.filter = navParams.get('filter');
		this.brand = this.bk.getBrand(this.filter.brand);
	}
}
