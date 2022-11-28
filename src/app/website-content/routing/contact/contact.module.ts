import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ContactComponent } from './contact.component';
import { MessageComponent } from './components/message.component';

import { SharedModule } from '../../shared-module/shared.module';

@NgModule({
  imports: [ RouterModule.forChild([
    {
      path: '',
      pathMatch: 'full',
      component: ContactComponent
    }
  ]),
  SharedModule ],
  declarations: [ ContactComponent, MessageComponent ],
})
export class ContactModule { }
