import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStudentPageRoutingModule } from './create-student-routing.module';

import { CreateStudentPage } from './create-student.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStudentPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [CreateStudentPage],
})
export class CreateStudentPageModule { }
