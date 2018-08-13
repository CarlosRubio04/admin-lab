import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';

import { MainService } from './main.service';

@Injectable()
export class AutorizacionService {
	callBack:boolean = false;

	constructor (private angularFireAuth: AngularFireAuth, private router:Router, private mainService:MainService) {
		this.isLogged();
	}

	public login = (email, password) => {
		this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
			.then((response) => {
				console.log(response);
			})
			.catch((error)=> {
				console.log(error);
			})
	};
	public singin = (email, password) => {
		this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				var admin = {
					'uId': response.uid,
					'email': response.email,
				}
				this.mainService.saveAdmin(admin);
			})
			.catch((error)=> {
				console.log(error);
			})
	};

	loginWithGoogle() {
		return this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
	}

	public isLogged() {
		return this.angularFireAuth.authState;
	};

	public loggout() {
		this.angularFireAuth.auth.signOut();
		this.router.navigate(['/']);
	}

	public getUser(){
		return this.angularFireAuth.auth;
	}
}
