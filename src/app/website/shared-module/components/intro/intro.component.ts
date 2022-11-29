import { Component, AfterContentInit, Input } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { Hexagon } from './hexagon/hexagon';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.component.html',
  styleUrls: [ 'intro.component.css' ]
})

export class IntroComponent implements AfterContentInit {
  @Input() title: string;
  @Input() subtitle: string;

  private hexagon: Hexagon;

  constructor() {
    this.hexagon = new Hexagon();
  }

  ngAfterContentInit() {
    this.hexagon.init();
  }

  onResized(event: ResizedEvent): void {
    this.hexagon.resize(event.newRect.width, event.newRect.height);
  }
}