import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
  },
  {
    path: '**',
    loadChildren: () => import('./routing/not-found/not-found.module').then(module => module.NotFoundModule),
    data: { animation: "not-found" }
  }
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  declarations: [],
  providers: [],
})
export class ContentModule { }
