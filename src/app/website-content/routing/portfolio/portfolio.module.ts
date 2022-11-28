import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';
import { ProjectsComponent } from './components/projects/projects.component';

import { SharedModule } from '../../shared-module/shared.module';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: PortfolioComponent
    }
  ]),
  SharedModule ],
  declarations: [ PortfolioComponent, ProjectsComponent ],
})
export class PortfolioModule { }
