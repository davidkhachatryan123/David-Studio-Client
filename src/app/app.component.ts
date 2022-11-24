import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { IntroContentService } from './intro-content.service';
import { CookieService } from 'ngx-cookie-service';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ "./app-css/app.component.navbar.css", "./app-css/app.component.intro.css",
               "./app-css/app.component.phone.css", "./app-css/app.component.footer.css" ],
  providers: [ CookieService ]
})
export class AppComponent implements OnInit, AfterContentInit {
  language: string;
  title: string;
  subtitle: string;

  constructor(
    private router: Router,
    private transloco: TranslocoService,
    private titleService: Title,
    private introContentService: IntroContentService,
    private cookie: CookieService) {

      this.introContentService.getData(this.router.url)[0].subscribe(value => this.title = value);
      this.introContentService.getData(this.router.url)[1].subscribe(value => this.subtitle = value);
  }

  ngOnInit() {
    this.router.events.subscribe(this.routeChangeStart);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      var introContent = this.introContentService.getData(this.router.url);

      introContent[0].subscribe(value => this.title = value);
      introContent[1].subscribe(value => this.subtitle = value);

      this.transloco.selectTranslate('title' + ((this.router.url !== '/') ?
        (this.router.url as any).split('#')[0].split('?')[0].replaceAll('/', '.') :
        '.home')
      )
      .subscribe((value: string) => this.titleService.setTitle(value));
    });

    this.getSiteLanguage();
  }

  ngAfterContentInit() {
    this.loadScript('assets/js/hexagon/effect.js');
    this.loadScript('assets/js/hexagon/background-movement.js');
  }

  routeChangeStart(ev: any) {
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
      this.cookie.set('lang', 'hy-AM', 1);
      this.language = 'hy-AM';
    }
    
    this.changeSiteLanguage(this.language);
  }
  changeSiteLanguage(language: string): void {
    this.language = language;
    this.cookie.set('lang', language, 1);

    this.transloco.setActiveLang(language);
  }

  loadScript(path: string) {
      const node = document.createElement('script');
      node.src = path;
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].appendChild(node);
  }
}
