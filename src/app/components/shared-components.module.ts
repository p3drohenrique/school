import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalSchoolClassComponent } from './modal-school-class/modal-school-class.component';
import { ModalStudentComponent } from './modal-student/modal-student.component';

@NgModule({
  declarations: [ModalSchoolClassComponent, ModalStudentComponent],
  imports: [CommonModule, IonicModule],
  exports: [ModalSchoolClassComponent, ModalStudentComponent],
})
export class SharedComponentsModule {}
