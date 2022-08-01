import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CreateStudentPageForm {
  constructor(private formBuilder: FormBuilder) {}

  createForm(): FormGroup {
    return this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
          ),
        ],
      ],
      bornDate: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/
          ),
        ],
      ],
      zipCode: ['', [Validators.pattern(/^[0-9]{5}-[0-9]{3}$/)]],
      addressStreet: ['', [Validators.required]],
      addressNumber: ['', [Validators.required]],
      addressNeighborhood: ['', [Validators.required]],
      addressCity: ['', [Validators.required]],
      addressState: ['', [Validators.required]],
    });
  }
}
