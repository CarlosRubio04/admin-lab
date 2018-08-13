import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutorizacionService } from '../services/autorizacion.service'

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.scss']
})
export class SinginComponent {

	registro:any = {};
  callBack:boolean = false;
  callBackMessage:string = '';

  constructor(private autorizacionService: AutorizacionService, private router: Router) {}

  registrar() {
  	this.autorizacionService.singin(this.registro.email, this.registro.password);
  }
  googleSingIn() {
    this.autorizacionService.loginWithGoogle()
      .then(rsp => {
        console.log(rsp);
        console.log('Todo bello');
        this.router.navigate(['/complete']);
      })
      .catch((error) => {
        console.log(error);
        console.log('Todo malo');
      });
  } 
  close() {
    this.callBack = false;
  }

}
