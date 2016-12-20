import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { Backend } from '../providers/backend';
import { MyApp } from './app.component';

import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { CartPage } from '../pages/cart/cart';

import { TopLinks } from '../components/top-links/top-links';
import { AddToCart } from '../components/add-to-cart/add-to-cart';

import { MapToIterable } from '../pipes/maptoiterable';

export const firebaseConfig = {
	apiKey: "AIzaSyCMO6yJ6JB4QgEWySf36IWXexy4r6M7SHI",
	authDomain: "c-waters.firebaseapp.com",
	databaseURL: "https://c-waters.firebaseio.com",
	storageBucket: "c-waters.appspot.com",
	messagingSenderId: "133185273075"
};

const myFirebaseAuthConfig = {
	provider: AuthProviders.Password,
	method: AuthMethods.Password
}

@NgModule({
	declarations: [
		MyApp,
		WelcomePage,
		HomePage,
		LoginPage,
		CartPage,
		TopLinks,
		MapToIterable,
		AddToCart
	],
	imports: [
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		WelcomePage,
		HomePage,
		LoginPage,
		CartPage
	],
	providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Backend]
})
export class AppModule {}
