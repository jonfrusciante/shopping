import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Nav, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Backend } from '../../providers/backend';
import { HomePage } from '../home/home';

@Component({
	selector: 'login-page',
	templateUrl: 'login.html'
})
export class LoginPage {
	section: any;
	auth: any;
	database: any;
	loginForm: any;
	registerForm: any;
	passwordForm: any;
	
	constructor(
		private nav: Nav, 
		public navParams: NavParams,
		private formBuilder: FormBuilder, 
		public bk: Backend, 
		public alertCtrl: AlertController, 
		public loadingCtrl: LoadingController
	) {
		this.section = navParams.get('section');
		this.auth = this.bk.getAuth();
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
		this.registerForm = this.formBuilder.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			password: ['', Validators.required],
			dob: ['', Validators.required]
		});
		this.passwordForm = this.formBuilder.group({
			email: ['', Validators.required]
		});
	}
	
	switchTo(section){
		this.section = section;
	}
	
	login() {
		let formData = this.loginForm.value;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		
		this.auth.signInWithEmailAndPassword(formData.email, formData.password).then((user)=>{
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
	
	register() {
		let formData = this.registerForm.value;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		formData.dob = new Date(formData.dob).getTime();
		
		this.auth.createUserWithEmailAndPassword(formData.email, formData.password).then((user)=>{
			let profileData = {provider: user.providerData[0].providerId, displayName: formData.name, email: formData.email, dob: formData.dob};
			this.bk.createProfile(user.uid, profileData);
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
	
	forgotPassword() {
		let formData = this.passwordForm.value;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		this.auth.sendPasswordResetEmail(formData.email).then((success)=>{
			loading.dismiss();
			let alert = this.alertCtrl.create({
				title: 'Success',
				subTitle: 'The link to reset your password has been sent to your Email ID',
				buttons: ['OK']
			});
			alert.present();			
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
}
