import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AngularResizeEventModule } from 'angular-resize-event';

import { ContentIntroComponent } from './components/content-intro/content-intro.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroComponent } from './components/intro/intro.component';
import { PhoneComponent } from './components/phone/phone.component';
import { FooterComponent } from './components/footer/footer.component';

import { IntroPipe } from './pipes/intro.pipe';

@NgModule({
  imports: [ BrowserModule, RouterModule, AngularResizeEventModule ],
  declarations: [ ContentIntroComponent,
                  NavbarComponent, IntroComponent, PhoneComponent, FooterComponent,
                  IntroPipe ],
  exports: [ ContentIntroComponent,
             NavbarComponent, IntroComponent, PhoneComponent, FooterComponent,
             IntroPipe ],
  providers: [ ]
})
export class SharedModule { }
