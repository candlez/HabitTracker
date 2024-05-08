import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitDashboardComponent } from './habit-dashboard.component';

describe('HabitDashboardComponent', () => {
  let component: HabitDashboardComponent;
  let fixture: ComponentFixture<HabitDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
