import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';


@Injectable()
export class AutorizacionService {
	callBack:boolean = false;

	constructor (private angularFireAuth: AngularFireAuth, private router:Router) {
		this.isLogged();
	}

	public login = (email, password) => {
		this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
			.then((response) => {
				this.router.navigate(['/home']);
				console.log('hola');
			})
			.catch((error)=> {
				alert('Error');
				console.log(error);
			})
	};
	public singin = (email, password) => {
		this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((response) => {
				this.router.navigate(['/complete']);
			})
			.catch((error)=> {
				this.callBack = false;
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
