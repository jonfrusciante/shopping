import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Backend } from '../providers/backend';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any;
	menuType: any = 'men';
	pages: Array<{title: string, component: any, params?: any}>;
	profile: any;

	constructor(
		public platform: Platform,
		public bk: Backend,
		public menu: MenuController
	) {
		this.initializeApp();
		this.pages = [
			{ title: 'Home', component: HomePage },
			{ title: 'My First List', component: ListPage }
		];
		
		this.bk.auth.onAuthStateChanged((user)=>{			
			if (user) {
				this.rootPage = HomePage;
			} else {
				this.rootPage = WelcomePage;
			}
			this.profile = this.bk.getProfile();
		});
	}

	initializeApp() {
		this.platform.ready().then(() => {
			StatusBar.styleDefault();
			Splashscreen.hide();
		});
	}

	openPage(page) {
		this.menu.close();
		this.nav.setRoot(page.component);
	}
	
	goTo(page, params) {
		this.menu.close();
		switch (page) {
			case 'login':
            {
                this.nav.push(LoginPage, params);
				break;
            }
		}		
	}
	
	logout() {
		this.menu.close();
		this.bk.logout();
		this.nav.setRoot(WelcomePage);
	}
}
