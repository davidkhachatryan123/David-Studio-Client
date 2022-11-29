import { Component, OnInit, } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ChildrenOutletContexts } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';
import { opacity } from './shared-module/animations/animations';

declare var $: any;

@Component({
  selector: 'web-site',
  templateUrl: 'website.component.html',
  animations: [
    opacity
  ]
})
export class WebSiteComponent implements OnInit {
  constructor(
    private router: Router,
    private titleService: Title,
    private transloco: TranslocoService,
    private contexts: ChildrenOutletContexts
  ) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(this.routeChangeStart);
    
    this.transloco.selectTranslate('title' + ((this.router.url !== '/') ?
      (this.router.url as any).split('#')[0].split('?')[0].replaceAll('/', '.') : '.home')
    )
    .subscribe((value: string) => this.titleService.setTitle(value));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev: any) => {
      this.transloco.selectTranslate('title' + ((ev.url !== '/') ?
        (ev.url as any).split('#')[0].split('?')[0].replaceAll('/', '.') : '.home')
      )
      .subscribe((value: string) => this.titleService.setTitle(value));
    })
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

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}