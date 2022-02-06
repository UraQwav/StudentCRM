import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { EventPaageComponent } from './pages/event-paage/event-paage.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentInfoComponent } from './components/for-student-page/student-info/student-info.component';
import { CreateCompanyPageComponent } from './pages/create-company-page/create-company-page.component';
import { CreateStudentPageComponent } from './pages/create-student-page/create-student-page.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyInfoPageComponent } from './pages/company-info-page/company-info-page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'; 
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog'; 
import { EditStudentDialog } from './components/for-student-page/student-info/student-info.component';
import { AddStudentEventDialog } from './components/for-student-page/student-info/student-info.component';

import { EditStudentEvent } from './components/for-student-page/student-info/student-info.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker'; 
import {MatSelectModule} from '@angular/material/select'; 
import { CompanyEditDialog} from './pages/company-info-page/company-info-page.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    CompanyPageComponent,
    StudentPageComponent,
    EventPaageComponent,
    ErrorPageComponent,
    StudentInfoComponent,
    CreateCompanyPageComponent,
    CreateStudentPageComponent,
    CompanyInfoPageComponent,
    EditStudentDialog,
    AddStudentEventDialog,
    CompanyEditDialog,
    EditStudentEvent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatDialogModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
