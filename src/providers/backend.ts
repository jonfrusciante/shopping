import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take'
import * as firebase from 'firebase';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class Backend {
	fb: any;
	auth: any;
	currentUser: any;
	db: any;
	profileRef = 'users/';
	cartRef = 'cart/';
	menuRef = 'cms/menu';	
	productsRef = 'catalog/products/';
	categoriesRef = 'catalog/categories/';
	brandsRef = 'catalog/brands/';
	homeSliderRef = 'cms/homeSlider/';	
	
	profile: FirebaseObjectObservable<any>;
	cart: FirebaseObjectObservable<any>;
	menu: FirebaseListObservable<any>;
	products: FirebaseListObservable<any>;
	categories: FirebaseListObservable<any>;
	brands: FirebaseListObservable<any>;	
	homeSlider: FirebaseListObservable<any>;
	bestDeals: FirebaseListObservable<any>;
	topBrands: FirebaseListObservable<any>;
	
	constructor(
		public af: AngularFire
	) {
		this.fb = firebase;
		this.auth = this.fb.auth();
		this.auth.onAuthStateChanged((user)=>{
			this.currentUser = user;
			if(!this.currentUser){
				this.profile = null;
			}
		});
		this.db = this.af.database;
	}
	
	getAuth() {
		return this.auth;
	}
	
	getCurrentUser() {
		return this.currentUser;
	}
	
	getReauthenticateCredential(email, password) {
		return this.fb.auth.EmailAuthProvider.credential(email, password);
	}
	
	logout() {
		this.auth.signOut();
	}
	
	insert(path, data) {
		return this.db.object(path).set(data);
	}
	
	update(path, data) {
		return this.db.object(path).update(data);
	}
	
	createProfile(uid, profileData) {
		return this.insert(this.profileRef+uid, profileData);
	}
	
	getProfile() {
		if(this.currentUser && !this.profile){
			this.profile = this.db.object(this.profileRef+this.currentUser.uid);
		}
		return this.profile;
	}
	
	getCategories() {
		if(!this.categories){
			this.categories = this.db.list(this.categoriesRef).take(1);
		} 
		return this.categories;
	}
	
	getProducts() {
		if(!this.products){
			this.products = this.db.list(this.productsRef).take(1);
		} 
		return this.products;
	}
	
	getBrands() {
		if(!this.brands){
			this.brands = this.db.list(this.brandsRef).take(1);
		} 
		return this.brands;
	}
	
	getMenu() {
		if(!this.menu){
			this.menu = this.db.list(this.menuRef).take(1);
		} 
		return this.menu;
	}
	
	getHomeSlider() {
		if(!this.homeSlider){
			this.homeSlider = this.db.list(this.homeSliderRef).take(1);
		} 
		return this.homeSlider;
	}
	
	getBestDeals() {
		if(!this.bestDeals){
			this.bestDeals = this.db.list(this.productsRef, {
				query: {
					orderByChild: 'bestDeals',
					equalTo: true
				}
			}).take(1);
		}
		return this.bestDeals;
	}
	
	getTopBrands() {
		if(!this.topBrands){
			this.topBrands = this.db.list(this.brandsRef, {
				query: {
					orderByChild: 'topBrands',
					equalTo: true
				}
			}).take(1);
		} 
		return this.topBrands;
	}
	
	getCart() {
		if(this.currentUser && !this.cart){
			this.cart = this.db.object(this.cartRef+this.currentUser.uid);			
		}
		return this.cart;
	}
	
	getCartItem(itemKey) {
		return this.db.object(this.cartRef+this.currentUser.uid+'/items/'+itemKey).take(1);
	}
	
	addToCart(formData) {
		if(formData){
			let cartItem = this.getCartItem(formData.sku);
			cartItem.subscribe(data=>{
				if(data.$exists()) {
					let newQty = data.qty + formData.qty;
					let newTotal = newQty * formData.price;
					cartItem.update({'qty': newQty, 'rowTotal': newTotal});					
				} else {
					formData.rowTotal = formData.qty * formData.price;
					cartItem.update(formData);
				}
			});
			return cartItem;
		}
	}
	
	deleteCartItem(code) {
		let cartItem = this.getCartItem(code);
		cartItem.remove();
	}
	
	search(key) {
		return this.db.list(this.productsRef, {
			query: {
				orderByChild: 'name',
				startAt: key
			}
		}).take(1);
	}
}