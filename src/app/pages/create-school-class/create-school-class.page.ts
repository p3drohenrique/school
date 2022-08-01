import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { SchoolClassesService } from 'src/app/services/school-classes.service';
import { StudentsService, IStudent } from 'src/app/services/students.service';
import { CreateSchoolClassPageForm } from './create-school-class.page.form';

@Component({
  selector: 'app-create-school-class',
  templateUrl: './create-school-class.page.html',
  styleUrls: ['./create-school-class.page.scss'],
})
export class CreateSchoolClassPage implements OnInit {
  id = null;

  form: FormGroup;

  students: IStudent[] = [];

  constructor(
    private schoolClassesService: SchoolClassesService,
    private studentsService: StudentsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = new CreateSchoolClassPageForm(this.formBuilder).createForm();

    const id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.id = id;

    this.studentsService.getStudents().subscribe((response) => {
      this.students = response;
    });

    if (id) {
      this.schoolClassesService.getSchoolClassById(id).subscribe((response) => {
        this.form.patchValue({
          courseName: response.courseName,
          description: response.description,
          classroom: response.classroom,
          students: response.students,
        });
      });
    }
  }

  async handleSubmit() {
    try {
      if (!this.form.valid) {
        const errorToast = await this.toastController.create({
          message: 'Há campos não preenchidos ou inválidos no formulário',
          duration: 2500,
          color: 'danger',
        });

        await errorToast.present();

        return;
      }

      const loading = await this.loadingController.create({
        message: this.id ? 'Atualizando turma..' : 'Criando turma..',
        spinner: 'crescent',
      });

      const toast = await this.toastController.create({
        message: this.id
          ? 'Turma atualizada com sucesso'
          : 'Turma criada com sucesso',
        duration: 2500,
        color: 'success',
      });

      await loading.present();

      const { courseName, description, classroom, students } = this.form.value;

      if (!this.id) {
        this.schoolClassesService.addSchoolClass({
          courseName,
          description,
          classroom,
          students,
        });
      } else {
        this.schoolClassesService.updateSchoolClass({
          id: this.id,
          courseName,
          description,
          classroom,
          students,
        });
      }

      await loading.dismiss();

      await toast.present();

      this.router.navigateByUrl('/school-classes');
    } catch (err) {
      const errorToast = await this.toastController.create({
        message: `Ocorreu um erro inesperado ao tentar ${
          this.id ? 'salvar' : 'criar'
        } a turma`,
        duration: 2500,
        color: 'danger',
      });

      await errorToast.present();
    }
  }
}
