import { Component, OnInit } from '@angular/core';
import { AutorizacionService } from '../services/autorizacion.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	loginParams:any = {};
  loggedIn = false;
  loggedUser:any = null;
  constructor(private autorizacionService:AutorizacionService) { 

    this.autorizacionService.isLogged()
      .subscribe((result)=>{
        if(result && result.uid) {
          this.loggedIn = true;
          setTimeout(()=> {
            this.loggedUser = this.autorizacionService.getUser().currentUser.email;
            // console.log(this.loggedUser);
          }, 500);
        }else {
          this.loggedIn = false;
        }
      }, (error)=>{
        this.loggedIn = false;
      })
  	
  }
  
  login() {
  	this.autorizacionService.login(this.loginParams.email, this.loginParams.password);
  }
}
