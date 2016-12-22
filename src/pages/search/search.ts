import { Component, ViewChild } from '@angular/core';
import { MenuController, LoadingController, Nav, Searchbar  } from 'ionic-angular';
import { Backend } from '../../providers/backend';

@Component({
	selector: 'search-page',
	templateUrl: 'search.html'
})
export class SearchPage {
	@ViewChild('searchbar') searchbar:Searchbar ;
	products: any;
	categories: any;
	brands: any;
	result: any;
	
	constructor(
		public menu: MenuController,
		public nav: Nav,
		public bk: Backend,
		public loadingCtrl: LoadingController
	) {
		this.bk.getProducts().subscribe(products => {this.products = products;});
		this.bk.getCategories().subscribe(categories => {this.categories = categories;});
		this.bk.getBrands().subscribe(brands => {this.brands = brands;});
	}
	
	ionViewLoaded(){
		this.searchbar.setFocus();
	}
	
	onInput(event){
		this.result = {
			'products': [],
			'categories': [],
			'brands': []
		};
		if(event.target.value) {
			let searchKey = event.target.value.toLowerCase();
			
			
			Object.keys(this.products).map((key)=>{
				let product = this.products[key];
				if(product.name.toLowerCase().indexOf(searchKey) != '-1' || product.sku.toLowerCase().indexOf(searchKey) != '-1'){				
					this.result.products.push(product);
				}
			});
			
			Object.keys(this.categories).map((key)=>{
				let category = this.categories[key];
				if(category.name.toLowerCase().indexOf(searchKey) != '-1'){				
					this.result.categories.push(category);
				}
			});
			
			Object.keys(this.brands).map((key)=>{
				let brand = this.brands[key];
				if(brand.name.toLowerCase().indexOf(searchKey) != '-1'){				
					this.result.brands.push(brand);
				}
			});
		}
	}
	
	onFocus() {
	
	}
	
	onCancel() {
		this.nav.pop();
	}
}
