import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLookPostPopUpComponent } from './dashboard-look-post-pop-up.component';

describe('DashboardLookPostPopUpComponent', () => {
  let component: DashboardLookPostPopUpComponent;
  let fixture: ComponentFixture<DashboardLookPostPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardLookPostPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLookPostPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
