import { Component } from '@angular/core';
import { MenuController, LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { SearchPage } from '../../pages/search/search';

@Component({
	selector: '[search]',
	template: '<ion-searchbar (click)="goToSearch()"></ion-searchbar>'
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
	
	goToSearch() {
		this.nav.push(SearchPage);
	}
}
