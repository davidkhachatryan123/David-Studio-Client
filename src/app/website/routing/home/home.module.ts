import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

import { SharedModule } from '../../shared-module/shared.module';

import { ServicesComponent } from './components/services/services.component';
import { LatestProjectsComponent } from './components/latest-projects/latest-projects.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    }
  ]),
  SharedModule ],
  declarations: [ HomeComponent, ServicesComponent, LatestProjectsComponent ],
})
export class HomeModule { }
