import { Component, Input } from '@angular/core';
import { LoadingController, Nav } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'list',
	templateUrl: 'list.html'
})
export class List {
	@Input() filter: any;
	products: any;
	filteredProducts: any = [];
	
	constructor(
		public nav: Nav,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		
	}
	
	ngOnChanges(){
		if(this.filter) {
			this.bk.getProducts().subscribe(products => {
				this.products = products;
				this.getFilteredProducts();
			});
		}
	}
	
	getFilteredProducts() {
		for(let product of this.products) {
			let exclude = false;
			for(let key of Object.keys(this.filter)) {
				let value = this.filter[key];
				switch(key) {
					case 'category': {
						if(!product.category || !product.category[value]){ exclude = true; }
						break;
					}
					case 'brand': {
						if(product.brand != value){ exclude = true; }
						break;
					}
				}
			}
			if(!exclude) {
				this.filteredProducts.push(product);
			}
		}
	}
	
	addToCart(formData) {
		let loading = this.loadingCtrl.create({content: 'Please wait...'});
		loading.present();
		this.bk.addToCart(formData).subscribe(cartItem => {
			loading.dismiss();
		});
	}
}
