import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StudentServiceService } from 'src/app/serbice/student-service.service';
import { Company } from '../../ServerData/Company';
import { Events } from '../../ServerData/Events';
import { Student } from '../../ServerData/Student';

@Component({
  selector: 'app-create-student-page',
  templateUrl: './create-student-page.component.html',
  styleUrls: ['./create-student-page.component.css']
})
export class CreateStudentPageComponent implements OnInit {

  Form;
  company:Student = new Student();
  companies: Array<Student> = [];
  constructor(private formBuilder: FormBuilder, private route: Router, private globalSrv: StudentServiceService) {
    this.Form = new FormGroup({
      "name": new FormControl("", Validators.required),
      "kurs": new FormControl("", Validators.required),
      "spec": new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {
  }
events: Array<Events> = [];
  create(){
   if(localStorage.getItem("students")!=null){
    this.companies = JSON.parse(localStorage.getItem('students'));
    this.company = this.Form.value;
    let events = Array<Events>();
    events.push(new Events());
    this.company.events = events;
    this.companies.push(this.company);
    console.log(this.companies);
    this.globalSrv.theItem = JSON.stringify(this.companies);
   }
   else{
    this.company = this.Form.value;
    this.companies.push(this.company);
    console.log(this.company);
    this.globalSrv.theItem = JSON.stringify(this.companies);
   }
   this.route.navigate([ 'students']);
  }
}
