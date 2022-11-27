import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';
import { IntoductionComponent } from './components/introduction/introduction.component';
import { ProjectsComponent } from './components/projects/projects.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: PortfolioComponent
    }
  ]) ],
  declarations: [ PortfolioComponent, IntoductionComponent, ProjectsComponent ],
})
export class PortfolioModule { }
