import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DiscoverPage } from './discover.page';

import { DiscoverPageRoutingModule } from './discover-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    DiscoverPageRoutingModule,
    SharedModule,
  ],
  declarations: [DiscoverPage],
})
export class DiscoverPageModule {}
