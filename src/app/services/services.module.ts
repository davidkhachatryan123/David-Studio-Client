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
  { path: 'web', component: WebComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: 'arduino', component: ArduinoComponent },
  { path: 'hosting', component: HostingComponent },
];

@NgModule({
  imports: [ BrowserModule, HttpClientModule, RouterModule.forChild(appRoutes) ],
  exports: [ ServicesComponent ],
  declarations: [ ServicesComponent,
                  WebComponent, DesktopComponent, ArduinoComponent, HostingComponent ],
})
export class ServicesModule { }
