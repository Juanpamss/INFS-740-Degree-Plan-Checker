import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsDataReadonlyComponent } from './records-data-readonly.component';

describe('RecordsDataReadonlyComponent', () => {
  let component: RecordsDataReadonlyComponent;
  let fixture: ComponentFixture<RecordsDataReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordsDataReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsDataReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
