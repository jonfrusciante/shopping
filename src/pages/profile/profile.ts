import { Component } from '@angular/core';
import {Validators, FormBuilder } from '@angular/forms';
import { Nav, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Backend } from '../../providers/backend';


@Component({
	selector: 'profile-page',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	section: any;
	currentUser: any;
	profileForm: any;
	passwordForm: any;
	profile: any;
	
	constructor(private nav: Nav, public navParams: NavParams, private formBuilder: FormBuilder, public bk: Backend, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {	
		this.section = navParams.get('section');
		this.currentUser = this.bk.getCurrentUser();
		this.profile = this.bk.getProfile();
		
		this.profileForm = this.formBuilder.group({
			displayName: ['', Validators.required],
			email: ['', Validators.required],
			dob: ['', Validators.required]
		});
		this.passwordForm = this.formBuilder.group({
			password: ['', Validators.required],
			newPassword: ['', Validators.required]
		});
	}
	
	ionViewWillEnter(){}
	
	save() {
		let formData = this.profileForm.value;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		formData.dob = new Date(formData.dob).getTime();
		this.currentUser.updateProfile({
			displayName: formData.displayName
		}).then((user)=>{
			this.profile.update({displayName: formData.displayName, dob: formData.dob});
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
	
	changePassword() {
		let formData = this.passwordForm.value;
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		loading.present();
		let credential = this.bk.getReauthenticateCredential(this.currentUser.email, formData.password);
		
		this.currentUser.reauthenticate(credential).then(()=>{
			this.currentUser.updatePassword(formData.newPassword).then(()=>{
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
		},(error)=>{
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
