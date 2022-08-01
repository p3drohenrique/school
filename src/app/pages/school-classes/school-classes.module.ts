import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchoolClassesPageRoutingModule } from './school-classes-routing.module';

import { SchoolClassesPage } from './school-classes.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchoolClassesPageRoutingModule,
    SharedComponentsModule,
  ],
  declarations: [SchoolClassesPage],
})
export class SchoolClassesPageModule {}
