import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleContentComponent } from './schedule-content.component';

describe('ScheduleContentComponent', () => {
  let component: ScheduleContentComponent;
  let fixture: ComponentFixture<ScheduleContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
