import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IntroContentService } from '../../services/intro-content.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.component.html',
  styleUrls: [ 'intro.component.css' ]
})

export class IntroComponent implements OnInit {
  title: string;
  subtitle: string;

  constructor(
    private router: Router,
    private introContentService: IntroContentService,
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((ev: any) => {
      var introContent = this.introContentService.getData(ev.url);

      introContent[0].subscribe(value => this.title = value);
      introContent[1].subscribe(value => this.subtitle = value);
    });
  }
}