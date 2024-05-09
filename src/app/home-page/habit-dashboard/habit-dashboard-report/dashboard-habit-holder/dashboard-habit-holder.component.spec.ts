import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardHabitHolderComponent } from './dashboard-habit-holder.component';

describe('DashboardHabitHolderComponent', () => {
  let component: DashboardHabitHolderComponent;
  let fixture: ComponentFixture<DashboardHabitHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardHabitHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardHabitHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
