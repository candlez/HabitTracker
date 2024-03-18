import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHabitPopupComponent } from './create-habit-popup.component';

describe('CreateHabitPopupComponent', () => {
  let component: CreateHabitPopupComponent;
  let fixture: ComponentFixture<CreateHabitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateHabitPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateHabitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
