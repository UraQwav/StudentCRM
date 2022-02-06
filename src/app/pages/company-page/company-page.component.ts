import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Company } from '../../ServerData/Company'
@Component({
  selector: 'app-company-page',
  templateUrl: './company-page.component.html',
  styleUrls: ['./company-page.component.css']
})
export class CompanyPageComponent implements OnInit {
  companies: Array<Company> = [];
  constructor(private formBuilder: FormBuilder) { 
    if(localStorage.getItem('companies')!=null) 
      this.companies = JSON.parse(localStorage.getItem('companies'));
  }
  
  ngOnInit(): void {
  }

 
}
