import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContentIntroComponent } from './components/content-intro/content-intro.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroComponent } from './components/intro/intro.component';
import { PhoneComponent } from './components/phone/phone.component';
import { FooterComponent } from './components/footer/footer.component';

import { IntroContentService } from './services/intro-content.service';

@NgModule({
  imports: [ RouterModule ],
  declarations: [ ContentIntroComponent,
                  NavbarComponent, IntroComponent, PhoneComponent, FooterComponent ],
  exports: [ ContentIntroComponent,
             NavbarComponent, IntroComponent, PhoneComponent, FooterComponent ],
  providers: [ IntroContentService ]
})
export class SharedModule { }
