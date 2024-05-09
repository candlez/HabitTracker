import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDashboardReportComponent } from './habit-dashboard-report.component';

describe('HabitDashboardReportComponent', () => {
  let component: HabitDashboardReportComponent;
  let fixture: ComponentFixture<HabitDashboardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitDashboardReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitDashboardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
