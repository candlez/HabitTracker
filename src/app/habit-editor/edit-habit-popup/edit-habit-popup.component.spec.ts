import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitPopupComponent } from './edit-habit-popup.component';

describe('EditHabitPopupComponent', () => {
  let component: EditHabitPopupComponent;
  let fixture: ComponentFixture<EditHabitPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHabitPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHabitPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
