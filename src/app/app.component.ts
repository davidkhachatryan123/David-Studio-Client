import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { IntroContentService } from './tools/services/intro-content.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ "./app-css/app.component.main.css", "./app-css/app.component.navbar.css",
               "./app-css/app.component.intro.css", "./app-css/app.component.phone.css",
               "./app-css/app.component.footer.css" ],
  providers: [ CookieService ]
})
export class AppComponent implements OnInit {
  language: string;
  title: string;
  subtitle: string;

  constructor(
    private router: Router,
    private transloco: TranslocoService,
    private introContentService: IntroContentService,
    private cookie: CookieService) {

      this.introContentService.getData(this.router.url)[0].subscribe(value => this.title = value);
      this.introContentService.getData(this.router.url)[1].subscribe(value => this.subtitle = value);
  }

  ngOnInit() {
    this.router.events.subscribe(this.routeChanged);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.introContentService.getData(this.router.url)[0].subscribe(value => this.title = value);
      this.introContentService.getData(this.router.url)[1].subscribe(value => this.subtitle = value);
    });

    this.getSiteLanguage();
  }

  routeChanged(ev: any) {
    if(ev instanceof NavigationStart) {

      if($('.navbar-collapse.in')[0] != undefined)
        $('.navbar-toggle').click();

      if (window.scrollY != 0) {

        $('html, body').stop().animate({
          scrollTop: 0
        }, 500, 'easeInOutExpo');

      }
    }
  }

  getSiteLanguage() {
    this.language = this.cookie.get('lang');

    if(this.language === '') {
      this.cookie.set('lang', 'am', 1);
      this.language = 'am';
    }
    
    this.changeSiteLanguage(this.language);
  }
  changeSiteLanguage(language: string): void {
    this.language = language;
    this.cookie.set('lang', language, 1);

    this.transloco.setActiveLang(language);
  }
}
