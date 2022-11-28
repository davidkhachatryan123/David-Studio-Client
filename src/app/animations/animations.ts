import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

export const opacity =
  trigger('routeAnimations', [
    transition('* <=> *', [
      query(':leave', [ animate('0.5s ease-out', style({ opacity: 0 })) ])
    ])
  ]);