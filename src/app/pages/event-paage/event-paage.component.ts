import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Events } from '../../ServerData/Events';
import { EventsData } from '../../ServerData/EventsData';

@Component({
  selector: 'app-event-paage',
  templateUrl: './event-paage.component.html',
  styleUrls: ['./event-paage.component.css']
})
export class EventPaageComponent implements OnInit ,AfterViewInit{

  eventsData: Array<EventsData> = [];
  dataSource;
  displayedColumns: string[] = [ 
    'studentName',
    'name',
    'date',
    'company',
    'id'];
  constructor() { 
    if(localStorage.getItem('eventsData')!=null){
      this.eventsData = JSON.parse(localStorage.getItem('eventsData'));
    }
    this.dataSource = new MatTableDataSource(this.eventsData);
  }
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
  }
  deleteEvent(index: any) {
    const number = this.eventsData.indexOf(index);
    if (number > -1) {
      this.eventsData.splice(number, 1); 
    localStorage.setItem('eventsData', JSON.stringify(this.eventsData));
    this.dataSource = new MatTableDataSource(this.eventsData);
    this.dataSource.sort = this.sort;
  }
  }
}
