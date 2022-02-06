import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../../ServerData/Company';

@Component({
  selector: 'app-create-company-page',
  templateUrl: './create-company-page.component.html',
  styleUrls: ['./create-company-page.component.css']
})
export class CreateCompanyPageComponent implements OnInit {
  Form;
  company:Company = new Company();
  companies: Array<Company> = [];
  constructor(private formBuilder: FormBuilder, private route: Router) { 
    this.Form = new FormGroup({
      "name": new FormControl("", Validators.required),
      "address": new FormControl("", Validators.required)
    });
  }

  ngOnInit(): void {
  }

  create(){
   if(localStorage.getItem("companies")!=null){
    this.companies = JSON.parse(localStorage.getItem('companies'));
    this.company = this.Form.value;
    this.companies.push(this.company);
    console.log(this.companies);
    localStorage.setItem("companies", JSON.stringify(this.companies))
   }
   else{
    this.company = this.Form.value;
    this.companies.push(this.company);
    console.log(this.company);
    localStorage.setItem("companies", JSON.stringify(this.companies))
   }
   this.route.navigate([ 'сompanies']);
  }
}
