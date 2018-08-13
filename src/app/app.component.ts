import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import { DOCUMENT } from '@angular/platform-browser';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SwUpdate } from '@angular/service-worker';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    loggedIn = false;
    loggedUser: any = null;

    constructor( private renderer: Renderer,
        private router: Router,
        @Inject(DOCUMENT,) private document: any,
        private element : ElementRef,
        public location: Location,
        private swUpdate: SwUpdate,
        private autorizacionService: AutorizacionService) {

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
        
    ngOnInit() {

        if (this.swUpdate.isEnabled) {
            this.swUpdate.available.subscribe(() => {
                window.location.reload();
            });
        }

        var navbar : HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            }else{
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();
        });
        this.renderer.listenGlobal('window', 'scroll', (event) => {
            const number = window.scrollY;
            if (number > 150 || window.pageYOffset > 150) {
                // add logic
                navbar.classList.remove('navbar-transparent');
            } else {
                // remove logic
                navbar.classList.add('navbar-transparent');
            }
        });
        var ua = window.navigator.userAgent;
        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            var version = parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }
        if (version) {
            var body = document.getElementsByTagName('body')[0];
            body.classList.add('ie-background');

        }

    }
    removeNavigation() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        titlee = titlee.slice( 1 );
        if(titlee === 'singin' || titlee === 'login'){
            return false;
        }
        else {
            return true;
        }
    }
}
