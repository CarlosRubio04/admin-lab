import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AutorizacionService } from '../services/autorizacion.service';

import {
    trigger,
    state,
    style,
    animate,
    transition,
    query,
    stagger
} from '@angular/animations';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
    trigger('OneLine', [
        state('show', style({
            display: 'block',
            opacity: 1,
        })),
        state('hide',   style({
            display: 'none',
            opacity: 0,
        })),
        transition('show => hide', animate('300ms ease-out')),
        transition('hide => show', animate('100ms ease-in'))
        ])
    ]
})

export class HomeComponent implements OnInit {
    model = {
        left: true,
        middle: false,
        right: false
    };

    loggedUser: any = null;
    message: string = 'Estamo cargado la Aplicación';


    constructor(private autorizacionService: AutorizacionService, private router: Router) {
        this.autorizacionService.isLogged()
            .subscribe((result) => {
                if (result && result.uid) {
                    this.loggedUser = this.autorizacionService.getUser().currentUser.displayName;
                    this.message = 'Bienvenido';
                    setTimeout(() => {
                        this.router.navigate(['/calendar']);
                    }, 1000);
                } else {
                    this.message = 'Para acceder a la aplicación debe estar registrado, si lo está inicie sesión';
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 500);
                }
            }, (error) => {
                this.router.navigate(['/login']);
        });
    }

    ngOnInit() {}
}
