import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ServicesComponent } from './services.component';

@NgModule({
  imports: [ BrowserModule ],
  exports: [ ServicesComponent ],
  declarations: [ ServicesComponent ],
})
export class ServicesModule { }
