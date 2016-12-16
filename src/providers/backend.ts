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
	homeSliderRef = 'homeSlider/';
	bestDealsRef = 'bestDeals/';
	topBrandsRef = 'topBrands/';
	
	profile: FirebaseObjectObservable<any>;
	cart: FirebaseListObservable<any>;
	homeSlider: FirebaseListObservable<any>;
	topBrands: FirebaseListObservable<any>;
	
	constructor(public af: AngularFire) {
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
	
	getHomeSlider() {
		if(!this.homeSlider){
			this.homeSlider = this.db.list(this.homeSliderRef).take(1);
		} 
		return this.homeSlider;
	}
	
	getBestDeals() {
		if(!this.bestDeals){
			this.bestDeals = this.db.list(this.bestDealsRef).take(1);
		} 
		return this.bestDeals;
	}
	
	getTopBrands() {
		if(!this.topBrands){
			this.topBrands = this.db.list(this.topBrandsRef).take(1);
		} 
		return this.topBrands;
	}
	
	getCart() {
		if(this.currentUser && !this.cart){
			this.cart = this.db.list(this.cartRef+this.currentUser.uid);			
		}
		return this.cart;
	}
	
	getCartItem(itemKey) {
		return this.db.object(this.cartRef+this.currentUser.uid+'/'+itemKey).take(1);
	}
}