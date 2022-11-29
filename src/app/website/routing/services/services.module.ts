import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../../shared-module/shared.module';

import { ServicesComponent } from './services.component';
import { TilesComponent } from './components/tiles/tiles.component';
import { CirclesComponent } from './components/circles/circles.component';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: 'web',
      component: ServicesComponent
    },
    {
      path: 'desktop',
      component: ServicesComponent
    },
    {
      path: 'arduino',
      component: ServicesComponent
    },
    {
      path: 'hosting',
      component: ServicesComponent
    }
  ]),
  SharedModule ],
  declarations: [ ServicesComponent, TilesComponent, CirclesComponent ],
  providers: [],
})
export class ServicesModule { }
