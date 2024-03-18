import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHabitHolderComponent } from './edit-habit-holder.component';

describe('EditHabitHolderComponent', () => {
  let component: EditHabitHolderComponent;
  let fixture: ComponentFixture<EditHabitHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditHabitHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditHabitHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
