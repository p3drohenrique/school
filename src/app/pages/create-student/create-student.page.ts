import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { StudentsService } from 'src/app/services/students.service';
import { ZipCodeService } from 'src/app/services/zipcode.service';
import { CreateStudentPageForm } from './create-student.page.form';

@Component({
  selector: 'app-create-student',
  templateUrl: './create-student.page.html',
  styleUrls: ['./create-student.page.scss'],
})
export class CreateStudentPage implements OnInit {
  id = null;

  form: FormGroup;

  states = [
    'AC',
    'AL',
    'AP',
    'AM',
    'BA',
    'CE',
    'DF',
    'ES',
    'GO',
    'MA',
    'MT',
    'MS',
    'MG',
    'PA',
    'PB',
    'PR',
    'PE',
    'PI',
    'RJ',
    'RN',
    'RS',
    'RO',
    'RR',
    'SC',
    'SP',
    'SE',
    'TO',
  ];

  constructor(
    private zipCodeService: ZipCodeService,
    private studentsService: StudentsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.form = new CreateStudentPageForm(this.formBuilder).createForm();

    const id = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.id = id;

    if (id) {
      this.studentsService.getStudentById(id).subscribe((response) => {
        this.form.patchValue({
          name: response.name,
          email: response.email,
          phone: response.phone,
          bornDate: response.bornDate,
          zipCode: response.address.zipCode,
          addressStreet: response.address.street,
          addressNumber: response.address.number,
          addressNeighborhood: response.address.neighborhood,
          addressCity: response.address.city,
          addressState: response.address.state,
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
        message: this.id ? 'Atualizando..' : 'Cadastrando..',
        spinner: 'crescent',
      });

      const toast = await this.toastController.create({
        message: this.id
          ? 'Aluno atualizado com sucesso'
          : 'Aluno cadastrado com sucesso',
        duration: 2500,
        color: 'success',
      });

      await loading.present();

      const {
        name,
        email,
        phone,
        bornDate,
        zipCode,
        addressStreet,
        addressNumber,
        addressNeighborhood,
        addressCity,
        addressState,
      } = this.form.value;

      const student = {
        name,
        email,
        phone,
        bornDate,
        address: {
          zipCode,
          street: addressStreet,
          /* eslint-disable-next-line */
          number: addressNumber,
          neighborhood: addressNeighborhood,
          city: addressCity,
          state: addressState,
        },
      };

      if (!this.id) {
        this.studentsService.addStudent(student);
      } else {
        this.studentsService.updateStudent({
          id: this.id,
          ...student,
        });
      }

      await loading.dismiss();

      await toast.present();

      this.router.navigateByUrl('/students');
    } catch (err) {
      const errorToast = await this.toastController.create({
        message: `Ocorreu um erro inesperado ao tentar ${
          this.id ? 'salvar' : 'cadastrar'
        } o aluno`,
        duration: 2500,
        color: 'danger',
      });

      await errorToast.present();
    }
  }

  async getAddress(event: any) {
    const zipCode = event.currentTarget.value;

    if (!zipCode || zipCode.length < 9) {
      return;
    }

    const serializedZipCode = zipCode.replace('-', '');

    const loading = await this.loadingController.create({
      message: 'Buscando endereço',
      spinner: 'crescent',
    });

    await loading.present();

    this.zipCodeService
      .getAddressByZipCode(serializedZipCode)
      .subscribe((response) => {
        loading.dismiss();

        if (response.erro) {
          this.form.get('zipCode').setErrors({ pattern: true });
          return;
        }

        this.form.get('addressStreet').setValue(response.logradouro);
        this.form.get('addressNeighborhood').setValue(response.bairro);
        this.form.get('addressCity').setValue(response.localidade);
        this.form.get('addressState').setValue(response.uf);
      });
  }

  maskPhone(event: any) {
    let value = event.currentTarget.value;

    if (!value.match(/^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/)) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '($1) $2');
      value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }

    event.currentTarget.value = value;
  }

  maskDate(event: any) {
    let value = event.currentTarget.value;

    if (
      !value.match(
        /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
      )
    ) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{2})(\d)/, '$1/$2');
      value = value.replace(/(\d{2})(\d)/, '$1/$2');
    }

    event.currentTarget.value = value;
  }

  maskZipCode(event: any) {
    let value = event.currentTarget.value;

    if (!value.match(/^[0-9]{5}-[0-9]{3}$/)) {
      value = value.replace(/\D/g, '');
      value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    event.currentTarget.value = value;
  }
}
