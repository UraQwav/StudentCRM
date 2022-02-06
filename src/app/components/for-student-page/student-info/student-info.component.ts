import { Component, OnInit, Inject } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { Student } from '../../../ServerData/Student';
import { Events } from '../../../ServerData/Events';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StudentServiceService } from 'src/app/serbice/student-service.service';
import { DateAdapter } from '@angular/material/core';
import { Company } from '../../../ServerData/Company';
import { CompanyDataInfo } from '../../../ServerData/CompanyDataInfo';
import { EventsData } from '../../../ServerData/EventsData';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Hydrogen', weight: 1.0079, symbol: 'H', position: 0 },
  { name: 'Helium', weight: 4.0026, symbol: 'He', position: 1 },
  { name: 'Lithium', weight: 6.941, symbol: 'Li', position: 2 },
  { name: 'Beryllium', weight: 9.0122, symbol: 'Be', position: 3 },
  { name: 'Boron', weight: 10.811, symbol: 'B', position: 4 },
  { name: 'Carbon', weight: 12.0107, symbol: 'C', position: 5 },
  { name: 'Nitrogen', weight: 14.0067, symbol: 'N', position: 6 },
  { name: 'Oxygen', weight: 15.9994, symbol: 'O', position: 7 },
  { name: 'Fluorine', weight: 18.9984, symbol: 'F', position: 8 },
  { name: 'Neon', weight: 20.1797, symbol: 'Ne', position: 9 },
];


@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit, AfterViewInit {

  students: Array<Student> = [];
  student: Student = new Student();
  index;
  events: Array<Events> = [];
  displayedColumns: string[] = ['name', 'company', 'date', 'id'];
  dataSource;
  constructor(private route:ActivatedRoute, public dialog: MatDialog, private globalSrv: StudentServiceService) {
    if(localStorage.getItem('students')!=null){
      this.students = JSON.parse(localStorage.getItem('students'));
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
    }
      
    globalSrv.itemValue.subscribe((nextValue) => {
      this.students = JSON.parse(nextValue);
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
      
      this.dataSource = new MatTableDataSource(this.student.events);
      this.dataSource.sort = this.sort;
    });
  }
 
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.index = this.route.snapshot.paramMap.get('id');
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
      this.dataSource = new MatTableDataSource(this.student.events);
      this.dataSource.sort = this.sort;
    });
  }
  editEvent(event) {
    let dialogRef = this.dialog.open(EditStudentEvent);
    dialogRef.componentInstance.data = this.student;
    dialogRef.componentInstance.index = this.index;
    dialogRef.componentInstance.eventOld = event;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.students = JSON.parse(localStorage.getItem('students'));
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
      this.dataSource = new MatTableDataSource(this.student.events);
      this.dataSource.sort = this.sort;
    });
  }
  deleteEvent(index: any) {
    const number = this.student.events.indexOf(index);
    if (number > -1) {
      this.student.events.splice(number, 1);
    this.students[this.route.snapshot.paramMap.get('id')] = this.student;  
    this.globalSrv.theItem = JSON.stringify(this.students);
    this.dataSource = new MatTableDataSource(this.student.events);
    this.dataSource.sort = this.sort;
  }
  }
  addStudentEvent(){
    let dialogRef = this.dialog.open(AddStudentEventDialog);
    dialogRef.componentInstance.data = this.student;
    dialogRef.componentInstance.index = this.index;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.students = JSON.parse(localStorage.getItem('students'));
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
      this.dataSource = new MatTableDataSource(this.student.events);
      this.dataSource.sort = this.sort;
    });
  }
  editStudent(){
    let dialogRef = this.dialog.open(EditStudentDialog);
    dialogRef.componentInstance.data = this.student;
    dialogRef.componentInstance.index = this.index;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.students = JSON.parse(localStorage.getItem('students'));
      this.student = this.students[this.route.snapshot.paramMap.get('id')];
      this.dataSource = new MatTableDataSource(this.student.events);
      this.dataSource.sort = this.sort;
    });
  }
}

@Component({
  selector: 'edit-student-dialog',
  templateUrl: 'edit-student-dialog.html',
  styleUrls: ['./student-info.component.css']
})
export class EditStudentDialog implements OnInit{
  name;
  spec;
  kurs;
  nameV="";
  nameS="";
  nameA="";
  companyData: Array<CompanyDataInfo> = [];
  eventsData: Array<EventsData> = [];
  students: Array<Student> = [];
  constructor(private route:ActivatedRoute, private routett:Router,public dialogRef: MatDialogRef<EditStudentDialog>, @Inject(MAT_DIALOG_DATA) public data: Student, @Inject(MAT_DIALOG_DATA) public index, private globalSrv: StudentServiceService) {
  }
  ngOnInit(){

    let studentNew = new Student();
    console.log(this.index);
    this.students = JSON.parse(localStorage.getItem('students'));
    studentNew = this.students[this.index];
    this.name =studentNew.name;
    this.spec =studentNew.spec;
    this.kurs =studentNew.kurs;
    console.log(this.nameV);
  }
  saveData(){
    let studentNew = new Student();
    studentNew.kurs = this.kurs;
    studentNew.name = this.name;
    studentNew.spec = this.spec;
    studentNew.events = this.data.events;
    this.students = JSON.parse(localStorage.getItem('students'));
    this.students[this.index] = studentNew;
    this.globalSrv.theItem = JSON.stringify(this.students);

    if(localStorage.getItem('companyDataInformation')!=null){
      this.companyData = JSON.parse(localStorage.getItem('companyDataInformation'));
    }
    if(localStorage.getItem('eventsData')!=null){
      this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
    }
    for (let i = 0; i < this.companyData.length; i++) {
      if(this.companyData[i].studentName == this.data.name){
        this.companyData[i].studentName = studentNew.name;
        localStorage.setItem('companyDataInformation',JSON.stringify(this.companyData));
      }
    }
    for (let k = 0; k < this.eventsData.length; k++) {
      if(this.eventsData[k].studentName == this.data.name){
        this.eventsData[k].studentName = studentNew.name;
        localStorage.setItem('eventsData',JSON.stringify(this.eventsData));
      }
      
    }
    this.dialogRef.close();
  }
}
@Component({
  selector: 'add-student-event-dialog',
  templateUrl: 'add-student-event-dialog.html',
  styleUrls: ['./student-info.component.css']
})
export class AddStudentEventDialog {
  name;
  date;
  company;
  students: Array<Student> = [];
  companies: Array<Company> = [];
  companyData: Array<CompanyDataInfo> = [];
  eventsData: Array<EventsData> = [];
  companyDataItem: CompanyDataInfo = new CompanyDataInfo(); 
  constructor(private route:ActivatedRoute, private routett:Router,public dialogRef: MatDialogRef<EditStudentDialog>, @Inject(MAT_DIALOG_DATA) public data: Student, @Inject(MAT_DIALOG_DATA) public index,private globalSrv: StudentServiceService) {
    this.companies = JSON.parse(localStorage.getItem('companies'));
  }
  saveData(){
    this.students = JSON.parse(localStorage.getItem('students'));
    let studentNew = new Events();
    studentNew.name = this.name;
    studentNew.date = this.date.toString().substr(4,11);
    studentNew.company = this.company;
    if(localStorage.getItem('companyDataInformation')!=null){
      this.companyData = JSON.parse(localStorage.getItem('companyDataInformation'));
    }
    if(localStorage.getItem('eventsData')!=null){
      this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
    }
    let event = new EventsData();
    event.company = this.company;
    event.date = this.date;
    event.name = this.name;
    event.studentName = this.students[this.index].name;
    this.eventsData.push(event);
    localStorage.setItem('eventsData',JSON.stringify(this.eventsData));
    
    this.companyDataItem.date = this.date;
    this.companyDataItem.company = this.company;
    this.companyDataItem.eventName = this.name;
    this.companyDataItem.studentName = this.students[this.index].name;
    this.companyDataItem.studentCurs = this.students[this.index].kurs;
    this.companyData.push(this.companyDataItem);
    localStorage.setItem('companyDataInformation',JSON.stringify(this.companyData));
    

    this.students[this.index].events.push(studentNew);
    this.globalSrv.theItem = JSON.stringify(this.students);
    
    this.dialogRef.close();
    
  }
}
@Component({
  selector: 'edit-student-event',
  templateUrl: 'edit-student-event.html',
  styleUrls: ['./student-info.component.css']
})
export class EditStudentEvent implements OnInit{
  name;
  date;
  company;
  students: Array<Student> = [];
  companies: Array<Company> = [];
  companyData: Array<CompanyDataInfo> = [];
  eventsData: Array<EventsData> = [];
  companyDataItem: CompanyDataInfo = new CompanyDataInfo(); 
  constructor(private route:ActivatedRoute, private routett:Router,public dialogRef: MatDialogRef<EditStudentDialog>, @Inject(MAT_DIALOG_DATA) public data: Student,@Inject(MAT_DIALOG_DATA) public eventOld:Events, @Inject(MAT_DIALOG_DATA) public index,private globalSrv: StudentServiceService) {
    this.companies = JSON.parse(localStorage.getItem('companies'));
  }
  ngOnInit(){

   
    this.name = this.eventOld.name;
    this.date = new Date(this.eventOld.date);
    this.company = this.eventOld.company;
    
  }
  saveData(){
    this.students = JSON.parse(localStorage.getItem('students'));
    let studentNew = new Events();
    studentNew.name = this.name;
    studentNew.date = this.date.toString().substr(4,11);
    studentNew.company = this.company;
    if(localStorage.getItem('companyDataInformation')!=null){
      this.companyData = JSON.parse(localStorage.getItem('companyDataInformation'));
    }
    if(localStorage.getItem('eventsData')!=null){
      this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
    }
    for (let j = 0; j < this.eventsData.length; j++) {
      if(this.eventsData[j].company==this.eventOld.company&&this.eventsData[j].name==this.eventOld.name)
        {

          let event = new EventsData();
          event.company = this.company;
          event.date = this.date;
          event.name = this.name;
          event.studentName = this.students[this.index].name;
          
          this.eventsData[j] = event;
          localStorage.setItem('eventsData',JSON.stringify(this.eventsData));
        }
    }
    for (let i = 0; i < this.companyData.length; i++) {
      if( this.companyData[i].company==this.eventOld.company&&this.companyData[i].eventName==this.eventOld.name){
        this.companyDataItem.date = this.date;
        this.companyDataItem.company = this.company;
        this.companyDataItem.eventName = this.name;
        this.companyDataItem.studentName = this.students[this.index].name;
        this.companyDataItem.studentCurs = this.students[this.index].kurs;
        this.companyData[i]=this.companyDataItem;
        localStorage.setItem('companyDataInformation',JSON.stringify(this.companyData));
      }
    }
    for (let k = 0; k < this.students[this.index].events.length; k++) {
      if(this.students[this.index].events[k].company==this.eventOld.company&&this.students[this.index].events[k].name==this.eventOld.name)
      {
        this.students[this.index].events[k] = studentNew
      
      this.globalSrv.theItem = JSON.stringify(this.students);
    }
    }
    this.dialogRef.close();
    
  }
}


