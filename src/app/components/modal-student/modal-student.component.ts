import { Component, Input, OnInit } from '@angular/core';
import { IStudent, StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-modal-student',
  templateUrl: './modal-student.component.html',
  styleUrls: ['./modal-student.component.scss'],
})
export class ModalStudentComponent implements OnInit {
  @Input() id: string;

  student: IStudent = null;

  constructor(private studentsService: StudentsService) {}

  ngOnInit() {
    this.studentsService.getStudentById(this.id).subscribe((response) => {
      this.student = response;
    });
  }
}
