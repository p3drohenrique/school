import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSchoolClassPageRoutingModule } from './create-school-class-routing.module';

import { CreateSchoolClassPage } from './create-school-class.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateSchoolClassPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateSchoolClassPage],
})
export class CreateSchoolClassPageModule {}
