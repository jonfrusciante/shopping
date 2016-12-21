import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: '[search]',
	templateUrl: 'search.html'
})
export class Search {
	results: any;
	
	constructor(
		public menu: MenuController, 
		public nav: Nav,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.results;
	}
	
	search(event) {
		let key = event.target.value;
		this.results = this.bk.search(key);
		this.results.subscribe(data=>{console.log(data)});
	}
}
