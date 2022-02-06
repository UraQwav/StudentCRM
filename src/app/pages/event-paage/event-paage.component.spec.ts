import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventPaageComponent } from './event-paage.component';

describe('EventPaageComponent', () => {
  let component: EventPaageComponent;
  let fixture: ComponentFixture<EventPaageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventPaageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventPaageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
