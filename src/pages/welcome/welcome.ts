import { Component } from '@angular/core';
import { MenuController, Nav, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Backend } from '../../providers/backend';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

@Component({
	selector: 'welcome-page',
	templateUrl: 'welcome.html'
})
export class WelcomePage {
	auth: any;
	tourCompleted: any;
	
	constructor(
		public menu: MenuController, 
		public nav: Nav, public storage: Storage,
		public bk: Backend,
		public alertCtrl: AlertController, 
		public loadingCtrl: LoadingController
	) {
		this.auth = this.bk.getAuth();
	}
	
	ionViewWillEnter(){
		this.menu.enable(false);
		this.storage.get('tourCompleted').then((tourCompleted)=>{
			this.tourCompleted = tourCompleted ? tourCompleted : false;
		});
	}
	
	completeTour() {
		this.tourCompleted = this.storage.set('tourCompleted', true).then(()=>{
			this.tourCompleted = true;
		});
	}
	
	loginAnonymous() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		
		this.auth.signInAnonymously().then((user)=>{
			this.nav.setRoot(HomePage);
			loading.dismiss();
		}).catch((error)=>{
			loading.dismiss();
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: error.message,
				buttons: ['OK']
			});
			alert.present();
		});
	}
	
	goTo(page, params) {
		switch (page) {
			case 'login':
            {
                this.nav.push(LoginPage, params);
				break;
            }
			case 'home':
            {
                this.nav.setRoot(HomePage, params);
				break;
            }
		}		
	}
}
