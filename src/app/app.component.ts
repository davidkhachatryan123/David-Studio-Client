import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, ChildrenOutletContexts } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ "./app-css/app.component.main.css", "./app-css/app.component.navbar.css",
               "./app-css/app.component.intro.css", "./app-css/app.component.phone.css",
               "./app-css/app.component.footer.css" ]
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private contexts: ChildrenOutletContexts) { }

  ngOnInit() {
    this.router.events.subscribe((ev: any) => {
      if(ev instanceof NavigationStart && window.scrollY != 0) {

        $('html, body').stop().animate({
          scrollTop: 0
        }, 500, 'easeInOutExpo');
      }
    });
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}
