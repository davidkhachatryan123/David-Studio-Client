import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import {Routes, RouterModule } from '@angular/router';

import { ServicesComponent } from './services.component';
import { WebComponent } from './web/web.component';
import { DesktopComponent } from './desktop/desktop.component';
import { ArduinoComponent } from './arduino/arduino.component';
import { HostingComponent } from './hosting/hosting.component';

const appRoutes: Routes = [
  { path: 'web', component: WebComponent, title: 'Web' },
  { path: 'desktop', component: DesktopComponent, title: 'Desktop' },
  { path: 'arduino', component: ArduinoComponent, title: 'Arduino' },
  { path: 'hosting', component: HostingComponent, title: 'Hosting' },
];

@NgModule({
  imports: [ BrowserModule, HttpClientModule, RouterModule.forChild(appRoutes) ],
  exports: [ ServicesComponent ],
  declarations: [ ServicesComponent,
                  WebComponent, DesktopComponent, ArduinoComponent, HostingComponent ],
})
export class ServicesModule { }
