import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ModalSchoolClassComponent } from 'src/app/components/modal-school-class/modal-school-class.component';
import {
  SchoolClassesService,
  ISchoolClass,
} from 'src/app/services/school-classes.service';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.page.html',
  styleUrls: ['./school-classes.page.scss'],
})
export class SchoolClassesPage implements OnInit {
  schoolClasses: ISchoolClass[] = [];

  constructor(
    private schoolClassesService: SchoolClassesService,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.schoolClassesService.getSchoolClasses().subscribe((response) => {
      this.schoolClasses = response;
    });
  }

  async showSchoolClass(id: string) {
    const modal = await this.modalController.create({
      component: ModalSchoolClassComponent,
      componentProps: { id },
      breakpoints: [0, 0.55],
      initialBreakpoint: 0.55,
    });

    await modal.present();
  }

  async editSchoolClass(id: string) {
    const alert = await this.alertController.create({
      header: 'Deseja editar está turma?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          handler: () => {
            this.router.navigateByUrl(`/create-school-class?id=${id}`);
          },
        },
      ],
    });

    await alert.present();
  }

  async deleteSchoolClass(id: string) {
    const alert = await this.alertController.create({
      header: 'Deseja excluir está turma?',
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
                message: 'Turma excluída com sucesso!',
                duration: 2500,
                color: 'success',
              });

              this.schoolClassesService.deleteSchoolClass(id);

              await toast.present();
            } catch (err) {
              const errorToast = await this.toastController.create({
                message:
                  'Ocorreu um erro inesperado ao tentar excluir a turma.',
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
