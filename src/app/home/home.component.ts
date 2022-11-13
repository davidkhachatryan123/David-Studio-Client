import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private translocoService: TranslocoService, private title: Title) { }

  ngOnInit(): void {
    this.translocoService.selectTranslate('title.home').subscribe(value => this.title.setTitle(value));
  }
}
