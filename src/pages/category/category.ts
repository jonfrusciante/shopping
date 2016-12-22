import { Component } from '@angular/core';
import { LoadingController, Nav, NavParams } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'category',
	templateUrl: 'category.html'
})
export class CategoryPage {
	filter: any;
	category: any;
	
	constructor(
		public nav: Nav,
		public navParams: NavParams,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.filter = navParams.get('filter');console.log(this.filter);
		this.category = this.bk.getCategory(this.filter.category);	console.log(this.category);	
	}
}
