import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitCreatorComponent } from './habit-creator.component';

describe('HabitCreatorComponent', () => {
  let component: HabitCreatorComponent;
  let fixture: ComponentFixture<HabitCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
