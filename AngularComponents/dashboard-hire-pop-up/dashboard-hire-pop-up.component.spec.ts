import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHirePopUpComponent } from './dashboard-hire-pop-up.component';

describe('DashboardHirePopUpComponent', () => {
  let component: DashboardHirePopUpComponent;
  let fixture: ComponentFixture<DashboardHirePopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardHirePopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHirePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
