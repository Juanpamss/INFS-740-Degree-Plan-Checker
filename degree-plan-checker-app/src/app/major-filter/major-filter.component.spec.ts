import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorFilterComponent } from './major-filter.component';

describe('MajorFilterComponent', () => {
  let component: MajorFilterComponent;
  let fixture: ComponentFixture<MajorFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
