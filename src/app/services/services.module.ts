import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services.component';
import { WebComponent } from './web/web.component';
import { DesktopComponent } from './desktop/desktop.component';
import { ArduinoComponent } from './arduino/arduino.component';
import { HostingComponent } from './hosting/hosting.component';

const servicesRoutes: Routes = [
  { path: 'web', component: WebComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: 'arduino', component: ArduinoComponent },
  { path: 'hosting', component: HostingComponent },
];

const appRoutes: Routes = [
  { path: 'services', redirectTo: '/services/web', pathMatch: 'full' },
  { path: 'services', component: ServicesComponent, children: servicesRoutes },
];

@NgModule({
  imports: [ BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes) ],
  exports: [ ServicesComponent ],
  declarations: [ ServicesComponent,
                  WebComponent, DesktopComponent, ArduinoComponent, HostingComponent ],
})
export class ServicesModule { }
