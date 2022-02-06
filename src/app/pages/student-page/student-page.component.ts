import { Component, OnInit } from '@angular/core';
import { Student } from '../../ServerData/Student'
import { StudentServiceService } from 'src/app/serbice/student-service.service'
import { EventsData } from '../../ServerData/EventsData';
import { CompanyDataInfo } from '../../ServerData/CompanyDataInfo';
@Component({
  selector: 'app-student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.css']
})
export class StudentPageComponent implements OnInit {
  eventsData:Array<EventsData> = [];
  companyData: Array<CompanyDataInfo> = [];
  students: Array<Student> = [];
  name;
  constructor(private globalSrv: StudentServiceService){
    
    globalSrv.itemValue.subscribe((nextValue) => {
      this.students = JSON.parse(nextValue);
    });
    if(localStorage.getItem('students')===null) {

    }
      // for (let index = 0; index < 10; index++) {
      //   let student = new Student();
      //   student.id = index;
      //   student.name = `Ivanov Ivan Ivanovich ${index}`;
      //   student.kurs = 3;
      //   this.students.push(student); 
      //   localStorage.setItem('students', JSON.stringify(this.students));
      // }
      
      else{
        this.students = JSON.parse(localStorage.getItem('students'));
      }
   }
   search(){
     this.students = JSON.parse(localStorage.getItem('students'));
     this.students = this.students.filter(element=>element.name.toUpperCase().includes(this.name.toUpperCase()));
   }
   deleteStudent(index){
     console.log(index);
     this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
     for (let i = 0; i < this.eventsData.length; i++) {
       if(this.eventsData[i].studentName==this.students[index].name){
        this.eventsData[i].studentName+="(deleted)";
       }
     }
     localStorage.setItem('eventsData',JSON.stringify(this.eventsData));

     this.companyData = JSON.parse(localStorage.getItem('companyDataInformation'));
     for (let i = 0; i < this.companyData.length; i++) {
       if(this.companyData[i].studentName==this.students[index].name){
        this.companyData[i].studentName+="(deleted)";
       }
     }
     localStorage.setItem('companyDataInformation',JSON.stringify(this.companyData));
     this.students.splice(index,1);
     console.log(this.students);
     this.globalSrv.theItem = JSON.stringify(this.students);
     
   }
  ngOnInit(): void {
  }
}
