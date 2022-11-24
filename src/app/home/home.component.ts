import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';
import { HomeServiceElement } from './models/home-service-element';
import { CookieService } from 'ngx-cookie-service';
import { filter, pluck } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { environment } from '../../environments/environment';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  services: HomeServiceElement[] = [];
  environment = environment;

  constructor(
    private homeService: HomeService,
    private cookie: CookieService,
    private translocoService: TranslocoService) { }

  ngOnInit(): void {
    this.GetServicesData(this.cookie.get('lang'));

    this.translocoService.events$.pipe(
      filter(e => e.type === 'langChanged'),
      pluck('payload')
    ).subscribe(({ langName, scope }) => {
      this.GetServicesData(langName);
    });
  }

  private GetServicesData(culture: string) {
    this.homeService.GetServices(culture)
    .subscribe((data: Array<HomeServiceElement>) => {
      this.services = data;
    });
  }
}
