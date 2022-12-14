import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: [ 'navbar.component.css' ],
  providers: [ CookieService ]
})

export class NavbarComponent implements OnInit {
  language: string;

  constructor(
    private cookie: CookieService,
    private transloco: TranslocoService
  ) { }

  ngOnInit() {
    this.setSiteLanguage();
  }

  setSiteLanguage() {
    this.language = this.cookie.get(environment.config.languageCookieName);

    this.changeSiteLanguage(this.language !== '' ? this.language : 'hy-AM');
  }
  changeSiteLanguage(language: string): void {
    this.language = language;
    this.cookie.set(environment.config.languageCookieName, language, 1);

    this.transloco.setActiveLang(language);
  }
}