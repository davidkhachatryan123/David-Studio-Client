import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./routing/home/home.module').then(module => module.HomeModule)
  }
];

@NgModule({
  imports: [ RouterModule.forChild(appRoutes) ],
  providers: [],
})
export class ContentModule { }
