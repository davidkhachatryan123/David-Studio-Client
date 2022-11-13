import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private router: Router,
              private translocoService: TranslocoService,
              private cookie: CookieService) { }

  ngOnInit() {
    this.router.events.subscribe((ev: any) => {
      if(ev instanceof NavigationStart) {
        if (window.scrollY != 0) {

          $('html, body').stop().animate({
            scrollTop: 0
          }, 500, 'easeInOutExpo');

        }
      }
    });

    this.language = this.cookie.get('lang');
    if(this.language === '') {
      this.cookie.set('lang', 'am', 1);
      this.language = 'am';
    }
    this.changeSiteLanguage(this.language);
  }

  changeSiteLanguage(language: string): void {
    this.translocoService.setActiveLang(language);

    this.language = language;
    this.cookie.set('lang', language, 1);
  }
}
