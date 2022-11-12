import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import {Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { WebComponent } from './services/web/web.component';
import { DesktopComponent } from './services/desktop/desktop.component';
import { ArduinoComponent } from './services/arduino/arduino.component';
import { HostingComponent } from './services/hosting/hosting.component';
import { ContactComponent } from './contact/contact.component';

const servicesRoutes: Routes = [
  { path: 'web', component: WebComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: 'arduino', component: ArduinoComponent },
  { path: 'hosting', component: HostingComponent },
];

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'services', redirectTo: '/services/web', pathMatch: 'full' },
  { path: 'services', children: servicesRoutes },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot(appRoutes), ReactiveFormsModule, HttpClientModule ],
  declarations: [ AppComponent,
                  HomeComponent, PortfolioComponent, ContactComponent, 
                  ServicesComponent, WebComponent, DesktopComponent, ArduinoComponent, HostingComponent ],
  providers: [ Title ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
