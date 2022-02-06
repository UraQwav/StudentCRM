import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { EventPaageComponent } from './pages/event-paage/event-paage.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { StudentInfoComponent } from './components/for-student-page/student-info/student-info.component';
import { CreateCompanyPageComponent } from './pages/create-company-page/create-company-page.component';
import { CreateStudentPageComponent } from './pages/create-student-page/create-student-page.component';
import { CompanyInfoPageComponent } from './pages/company-info-page/company-info-page.component';

const routes: 
Routes = [
  { path: '', redirectTo: 'students', pathMatch: 'full'},
  { path: 'students', component: StudentPageComponent, children: [ 
    {path: '', redirectTo: '/students/here/0', pathMatch: 'full'} ,
    {path: 'here/:id', component: StudentInfoComponent}
  ]},
  { path: 'сompanies', component: CompanyPageComponent },
  { path: 'companies/here/:id', component: CompanyInfoPageComponent },
  { path: 'create-company', component: CreateCompanyPageComponent },
  { path: 'create-student', component: CreateStudentPageComponent },
  { path: 'events', component: EventPaageComponent },
  { path: '**',  component: ErrorPageComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
