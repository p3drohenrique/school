import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSchoolClassPage } from './create-school-class.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSchoolClassPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSchoolClassPageRoutingModule {}
