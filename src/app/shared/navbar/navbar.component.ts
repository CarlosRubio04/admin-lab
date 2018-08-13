import { Component, OnInit, ElementRef } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AutorizacionService } from '../../services/autorizacion.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    private toggleButton: any;
    private sidebarVisible: boolean;

    loggedIn = false;
    loggedUser: any = null;

    constructor(public location: Location,
                private element: ElementRef,
                private autorizacionService: AutorizacionService) {
        this.sidebarVisible = false;

        this.autorizacionService.isLogged()
            .subscribe((result) => {
                if (result && result.uid) {
                    this.loggedIn = true;
                    setTimeout(() => {
                        this.loggedUser = this.autorizacionService.getUser().currentUser.uid;
                        console.log(this.loggedUser);
                    }, 500);
                } else {
                    this.loggedIn = false;
                }
            }, (error) => {
                this.loggedIn = false;
        });
    }

    loggout() {
        this.autorizacionService.loggout();
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    }
    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        // console.log(toggleButton, 'toggle');

        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);
        html.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const html = document.getElementsByTagName('html')[0];
        // console.log(html);
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        html.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    };
}
