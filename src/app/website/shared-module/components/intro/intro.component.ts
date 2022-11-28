import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IntroContentService } from '../../services/intro-content.service';
import { ResizedEvent } from 'angular-resize-event';
import { Hexagon } from './hexagon/hexagon';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.component.html',
  styleUrls: [ 'intro.component.css' ]
})

export class IntroComponent implements OnInit, AfterContentInit {
  title: string;
  subtitle: string;

  private hexagon: Hexagon;

  constructor(
    private router: Router,
    private introContentService: IntroContentService,
  ) {
    this.hexagon = new Hexagon();
  }

  ngOnInit() {
    var introContent = this.introContentService.getData(this.router.url);

    introContent[0].subscribe(value => this.title = value);
    introContent[1].subscribe(value => this.subtitle = value);


    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev: any) => {
      var introContent = this.introContentService.getData(this.router.url);

      introContent[0].subscribe(value => this.title = value);
      introContent[1].subscribe(value => this.subtitle = value);
    });
  }

  ngAfterContentInit() {
    this.hexagon.init();
  }

  onResized(event: ResizedEvent): void {
    this.hexagon.resize(event.newRect.width, event.newRect.height);
  }
}