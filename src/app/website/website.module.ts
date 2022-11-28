import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { WebSiteComponent } from './website.component';

import { NavbarComponent } from './components/navbar/navbar.component';
import { IntroComponent } from './components/intro/intro.component';
import { PhoneComponent } from './components/phone/phone.component';
import { FooterComponent } from './components/footer/footer.component';

import { TranslocoRootModule } from './transation/transloco-root.module';

import { IntroContentService } from './services/intro-content.service';

const appRoutes: Routes = [
  {
    path: '',
    component: WebSiteComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./routing/home/home.module').then(module => module.HomeModule),
        data: { animation: "home" }
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./routing/portfolio/portfolio.module').then(module => module.PortfolioModule),
        data: { animation: "portfolio" }
      },
      {
        path: 'contact',
        loadChildren: () => import('./routing/contact/contact.module').then(module => module.ContactModule),
        data: { animation: "contact" }
      }
    ]
  },
  {
    path: '**',
    loadChildren: () => import('./routing/not-found/not-found.module').then(module => module.NotFoundModule),
    data: { animation: "not-found" }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes), HttpClientModule, TranslocoRootModule ],
  declarations: [ WebSiteComponent, NavbarComponent, IntroComponent, PhoneComponent, FooterComponent ],
  providers: [ IntroContentService ],
})
export class WebSiteModule { }
