import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitPieChartComponent } from './habit-pie-chart.component';

describe('HabitPieChartComponent', () => {
  let component: HabitPieChartComponent;
  let fixture: ComponentFixture<HabitPieChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitPieChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
