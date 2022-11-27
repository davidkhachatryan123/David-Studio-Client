import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { ServicesComponent } from './components/services/services.component';
import { LatestProjectsComponent } from './components/latest-projects/latest-projects.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: HomeComponent
    }
  ]) ],
  declarations: [ HomeComponent, IntroductionComponent, ServicesComponent, LatestProjectsComponent ],
})
export class HomeModule { }
