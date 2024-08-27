import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitEditPageComponent } from './habit-edit-page.component';

describe('HabitEditPageComponent', () => {
  let component: HabitEditPageComponent;
  let fixture: ComponentFixture<HabitEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
