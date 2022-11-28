import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroComponent } from './components/intro/intro.component';
import { PhoneComponent } from './components/phone/phone.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContentModule } from './website-content/content.module';
import { TranslocoRootModule } from './transation/transloco-root.module';

import { IntroContentService } from './services/intro-content.service';

import { NotFoundComponent } from './website-content/routing/not-found/not-found.component';

@NgModule({
  imports: [ BrowserModule,
             HttpClientModule, TranslocoRootModule, BrowserAnimationsModule, ContentModule, RouterModule.forRoot([]) ],
  declarations: [ AppComponent, NavbarComponent, IntroComponent, PhoneComponent, FooterComponent ],
  bootstrap: [ AppComponent ],
  providers: [ IntroContentService ]
})
export class AppModule { }
