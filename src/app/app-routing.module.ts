import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./pages/students/students.module').then(
        (m) => m.StudentsPageModule
      ),
  },
  {
    path: 'create-student',
    loadChildren: () => import('./pages/create-student/create-student.module').then( m => m.CreateStudentPageModule)
  },
  {
    path: 'school-classes',
    loadChildren: () => import('./pages/school-classes/school-classes.module').then( m => m.SchoolClassesPageModule)
  },
  {
    path: 'create-school-class',
    loadChildren: () => import('./pages/create-school-class/create-school-class.module').then( m => m.CreateSchoolClassPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
