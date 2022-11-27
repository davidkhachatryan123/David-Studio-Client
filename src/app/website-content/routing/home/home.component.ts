import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { filter, pluck } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
