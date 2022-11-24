import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { ServicesComponent } from './services/services.component';
import { WebComponent } from './services/web/web.component';
import { DesktopComponent } from './services/desktop/desktop.component';
import { ArduinoComponent } from './services/arduino/arduino.component';
import { HostingComponent } from './services/hosting/hosting.component';
import { ContactComponent } from './contact/contact.component';

import { TranslocoRootModule } from './transation/transloco-root.module';

import { IntroContentService } from './intro-content.service';
import { HomeService } from './home/services/home.service';

import { ToHtmlPipe } from './pipes/to-html.pipe';

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
  { path: 'services', component: ServicesComponent, children: servicesRoutes },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule, HttpClientModule,
             RouterModule.forRoot(appRoutes), TranslocoRootModule ],
  declarations: [ AppComponent,
                  HomeComponent, PortfolioComponent, ContactComponent,
                  ServicesComponent, WebComponent, DesktopComponent, ArduinoComponent, HostingComponent,
                  ToHtmlPipe ],
  providers: [ Title, IntroContentService, HomeService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
