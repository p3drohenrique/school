import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class CreateSchoolClassPageForm {
  constructor(private formBuilder: FormBuilder) { }

  createForm(): FormGroup {
    return this.formBuilder.group({
      courseName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
      students: [null, [Validators.required]],
    });
  }
}
