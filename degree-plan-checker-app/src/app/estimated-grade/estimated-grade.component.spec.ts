import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimatedGradeComponent } from './estimated-grade.component';

describe('EstimatedGradeComponent', () => {
  let component: EstimatedGradeComponent;
  let fixture: ComponentFixture<EstimatedGradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimatedGradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimatedGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
