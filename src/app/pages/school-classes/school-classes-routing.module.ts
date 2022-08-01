import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchoolClassesPage } from './school-classes.page';

const routes: Routes = [
  {
    path: '',
    component: SchoolClassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchoolClassesPageRoutingModule {}
