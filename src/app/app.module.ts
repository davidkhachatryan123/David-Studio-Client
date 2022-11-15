import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ContactComponent } from './contact/contact.component';

import { ServicesModule } from './services/services.module';
import { TranslocoRootModule } from './tools/transation/transloco-root.module';

import { IntroContentService } from './tools/services/intro-content.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Home' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Portfolio' },
  { path: 'services', redirectTo: '/services/web', pathMatch: 'full' },
  { path: 'services', loadChildren: () => import('./services/services.module').then(m => m.ServicesModule) },
  { path: 'contact', component: ContactComponent, title: 'Contact' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpClientModule,
             RouterModule.forRoot(appRoutes),
             ServicesModule,
             TranslocoRootModule ],
  declarations: [ AppComponent,
                  HomeComponent, PortfolioComponent, ContactComponent ],
  providers: [ Title, IntroContentService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
