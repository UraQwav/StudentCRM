import { AfterViewInit, Component, Inject, OnInit, ViewChild, ɵConsole } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentServiceService } from 'src/app/serbice/student-service.service';
import { Company } from '../../ServerData/Company';
import { CompanyDataInfo } from '../../ServerData/CompanyDataInfo';
import { Events } from '../../ServerData/Events';
import { EventsData } from '../../ServerData/EventsData';
import { Student } from '../../ServerData/Student';

@Component({
  selector: 'app-company-info-page',
  templateUrl: './company-info-page.component.html',
  styleUrls: ['./company-info-page.component.css']
})
export class CompanyInfoPageComponent implements OnInit,AfterViewInit {

  Companies: Array<Company> = [];
  company: Company = new Company();
  students: Array<CompanyDataInfo> = [];
  studentsAll:Array<CompanyDataInfo> = [];
  eventsData: Array<EventsData> = [];
  studibecker: Array<Student> = [];
  dataSource;
  displayedColumns: string[] = [  'studentName',
    'studentCurs',
    'eventName',
    'date',
    'company'];
  constructor(private route:ActivatedRoute, public dialog: MatDialog, private routing: Router) { 
    if(localStorage.getItem('companies')!=null){
      this.Companies = JSON.parse(localStorage.getItem('companies'));
      this.company = this.Companies[this.route.snapshot.paramMap.get('id')];
      this.studentsAll = JSON.parse(localStorage.getItem('companyDataInformation'));
      this.studentsAll.forEach(element => {
        if(element.company==this.company.name){
          this.students.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.students);
    }
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.company = this.Companies[this.route.snapshot.paramMap.get('id')];
    });
  }
  editCompany(){
      let dialogRef = this.dialog.open(CompanyEditDialog);
      dialogRef.componentInstance.data = this.company;
      dialogRef.componentInstance.index = this.route.snapshot.paramMap.get('id');
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.Companies = JSON.parse(localStorage.getItem('companies'));
      this.company = this.Companies[this.route.snapshot.paramMap.get('id')];
      this.studentsAll = JSON.parse(localStorage.getItem('companyDataInformation'));
      this.students=[];
      this.studentsAll.forEach(element => {
        if(element.company==this.company.name){
          this.students.push(element)
        }
      });
      this.dataSource = new MatTableDataSource(this.students);
      this.dataSource.sort = this.sort;
      });
    
  }
  deleteCompany(){
    const number = this.Companies.indexOf(this.company);
    console.log(number);
    if (number > -1) {
      this.Companies.splice(number, 1);
    localStorage.setItem('companies',JSON.stringify(this.Companies));
    this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
     for (let i = 0; i < this.eventsData.length; i++) {
       if(this.eventsData[i].company==this.company.name){
        this.eventsData[i].company+="(deleted)";
       }
     }
     localStorage.setItem('eventsData',JSON.stringify(this.eventsData));
     this.studibecker = JSON.parse(localStorage.getItem('students'));
     for (let i = 0; i < this.studibecker.length; i++) {
       for (let k = 0; k < this.studibecker[i].events.length; k++) {
        if(this.studibecker[i].events[k].company==this.company.name){
          this.studibecker[i].events[k].company+="(deleted)";
         }
       }
     }
     localStorage.setItem('students',JSON.stringify(this.studibecker));
    this.routing.navigate(['/сompanies']);
  }
}
  deleteStudent(index){
    const number = this.studentsAll.indexOf(index);
    console.log(number);
    if (number > -1) {
      this.studentsAll.splice(number, 1);
    localStorage.setItem('companyDataInformation',JSON.stringify(this.studentsAll));
    this.students = [];
    this.studentsAll.forEach(element => {
      if(element.company==this.company.name){
        this.students.push(element)
      }
    });
    this.dataSource = new MatTableDataSource(this.students);
    this.dataSource.sort = this.sort;
  }

}}
@Component({
  selector: 'company-edit-dialog',
  templateUrl: 'company-edit-dialog.html',
  styleUrls: ['./company-info-page.component.css']
})
export class CompanyEditDialog implements OnInit{
  name;
  address;
  kurs;
  stud: Array<Student> = [];
  students: Array<Company> = [];
  studentsAll:Array<CompanyDataInfo> = [];
  eventsData: Array<EventsData> = [];
  constructor(private route:ActivatedRoute, private routett:Router,public dialogRef: MatDialogRef<CompanyEditDialog>, @Inject(MAT_DIALOG_DATA) public data: Company, @Inject(MAT_DIALOG_DATA) public index,private globalSrv: StudentServiceService) {}
  ngOnInit(): void {
    this.name=this.data.name;
    this.address = this.data.address;
  }
  saveData(){
    let studentNew = new Company();
    studentNew.name = this.name;
    studentNew.address = this.address;
    this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
    for (let index = 0; index < this.eventsData.length; index++) {
      if( this.eventsData[index].company==this.data.name){
        this.eventsData[index].company=this.name;
      }
      
    }
    this.stud = JSON.parse(localStorage.getItem('students'));
    this.stud.forEach(element => {
      element.events.forEach(element => {
        if(element.company==this.data.name)
          element.company = this.name;
      });
    });
    
    this.studentsAll = JSON.parse(localStorage.getItem('companyDataInformation'));
    for (let index = 0; index < this.studentsAll.length; index++) {
      if(this.studentsAll[index].company==this.data.name)
      this.studentsAll[index].company=this.name;
    }
    this.students = JSON.parse(localStorage.getItem('companies'));
    this.students[this.index] = studentNew;
    console.log(this.index);
    localStorage.setItem('students',JSON.stringify(this.stud));
    localStorage.setItem('companies',JSON.stringify(this.students));
   localStorage.setItem('companyDataInformation',JSON.stringify(this.studentsAll));
    localStorage.setItem('eventsData',JSON.stringify(this.eventsData));
    this.dialogRef.close();
  }

}
