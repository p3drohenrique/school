import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ModalStudentComponent } from 'src/app/components/modal-student/modal-student.component';
import { StudentsService, IStudent } from 'src/app/services/students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage implements OnInit {
  students: IStudent[] = [];

  constructor(
    private studentsService: StudentsService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.studentsService.getStudents().subscribe((response) => {
      this.students = response;
    });
  }

  async showStudent(id: string) {
    const modal = await this.modalController.create({
      component: ModalStudentComponent,
      componentProps: { id },
      breakpoints: [0, 0.7],
      initialBreakpoint: 0.7,
    });

    await modal.present();
  }

  async editStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Deseja editar este aluno?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.router.navigateByUrl(`create-student?id=${id}`);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteStudent(id: string) {
    const alert = await this.alertController.create({
      header: 'Deseja excluir este aluno?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: async () => {
            try {
              const toast = await this.toastController.create({
                message: 'Aluno excluído com sucesso',
                duration: 2500,
                color: 'success',
              });

              this.studentsService.deleteStudent(id);

              await toast.present();
            } catch (err) {
              const errorToast = await this.toastController.create({
                message: 'Ocorreu um erro inesperado ao tentar excluir o aluno',
                duration: 2500,
                color: 'danger',
              });

              await errorToast.present();
            }
          },
        },
      ],
    });

    await alert.present();
  }
}
