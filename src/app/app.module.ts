import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { WebSiteModule } from './website/website.module';

@NgModule({
  imports: [ BrowserModule, RouterModule.forRoot([]), WebSiteModule ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule { }
