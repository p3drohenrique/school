import { Component, Input, OnInit } from '@angular/core';
import {
  ISchoolClass,
  SchoolClassesService,
} from 'src/app/services/school-classes.service';
import { StudentsService, IStudent } from 'src/app/services/students.service';

interface ISchoolClassData extends Omit<ISchoolClass, 'students'> {
  students: IStudent[];
}

@Component({
  selector: 'app-modal-school-class',
  templateUrl: './modal-school-class.component.html',
  styleUrls: ['./modal-school-class.component.scss'],
})
export class ModalSchoolClassComponent implements OnInit {
  @Input() id: string;

  schoolClass: ISchoolClassData = null;

  constructor(
    private schoolClassesService: SchoolClassesService,
    private studentsService: StudentsService
  ) {}

  ngOnInit() {
    this.schoolClassesService
      .getSchoolClassById(this.id)
      .subscribe((response) => {
        this.studentsService
          .getStudentsByIds(response.students)
          .subscribe((anotherResponse) => {
            this.schoolClass = {
              ...response,
              students: anotherResponse,
            };
          });
      });
  }
}
