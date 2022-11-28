import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-intro',
  templateUrl: 'introduction.component.html'
})

export class IntroductionComponent {
  @Input() title: string;
  @Input() subtitle: string;
}