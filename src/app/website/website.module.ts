import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WebSiteComponent } from './website.component';

import { TranslocoRootModule } from './transation/transloco-root.module';
import { SharedModule } from './shared-module/shared.module';

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
  imports: [ RouterModule.forChild(appRoutes), SharedModule, HttpClientModule, TranslocoRootModule, BrowserAnimationsModule ],
  declarations: [ WebSiteComponent ],
  providers: [],
})
export class WebSiteModule { }
