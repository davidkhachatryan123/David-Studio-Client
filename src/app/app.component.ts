import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

import * as AOS from 'aos';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private transloco: TranslocoService
) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(this.routeChangeStart);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev: any) => {
      this.transloco.selectTranslate('title' + ((ev.url !== '/') ?
        (ev.url as any).split('#')[0].split('?')[0].replaceAll('/', '.') :
        '.home')
      )
      .subscribe((value: string) => this.titleService.setTitle(value));
    });

    AOS.init();

    AOS.init({
      // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
      offset: 120, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 400, // values from 0 to 3000, with step 50ms
      easing: 'ease-in-out', // default easing for AOS animations
      once: false, // whether animation should happen only once - while scrolling down
      mirror: false, // whether elements should animate out while scrolling past them
      anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
    });
  }

  ngAfterContentInit() {
    this.loadScript('assets/js/hexagon/effect.js');
    this.loadScript('assets/js/hexagon/background-movement.js');
  }

  routeChangeStart(ev: any) {
    if($('.navbar-collapse.in')[0] != undefined)
      $('.navbar-toggle').click();

    if (window.scrollY != 0) {

      $('html, body').stop().animate({
        scrollTop: 0
      }, 500, 'easeInOutExpo');

    }
  }

  loadScript(path: string) {
      const node = document.createElement('script');
      node.src = path;
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('body')[0].appendChild(node);
  }
}
