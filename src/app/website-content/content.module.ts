import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routing/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'portfolio',
    loadChildren: () => import('./routing/portfolio/portfolio.module').then(module => module.PortfolioModule)
  }
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  declarations: [],
  providers: [],
})
export class ContentModule { }
