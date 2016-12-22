import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Backend } from '../providers/backend';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';


@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;
	rootPage: any;
	menuType: any = 'men';
	pages: Array<{title: string, component: any, params?: any}>;
	profile: any;
	menuLinks: any;

	constructor(
		public platform: Platform,
		public bk: Backend,
		public menu: MenuController
	) {
		this.initializeApp();
		this.pages = [
			{ title: 'Home', component: HomePage }
		];
		
		this.bk.auth.onAuthStateChanged((user)=>{			
			if (user) {
				this.rootPage = HomePage;
			} else {
				this.rootPage = WelcomePage;
			}
			this.profile = this.bk.getProfile();
		});
		this.menuLinks = this.bk.getMenu();
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
	
	openCategoryLink(code) {		
		this.nav.push(CategoryPage, {'filter': {'category': code}});
		this.menu.close();
	}
	
	switchMenuType(type) {
		this.menuType = type;
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
