import { Component, Input } from '@angular/core';

@Component({
  selector: 'content-intro',
  templateUrl: 'content-intro.component.html'
})

export class ContentIntroComponent {
  @Input() title: string;
  @Input() subtitle: string;
}