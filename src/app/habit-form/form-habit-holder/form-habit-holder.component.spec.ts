import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHabitHolderComponent } from './form-habit-holder.component';

describe('FormHabitHolderComponent', () => {
  let component: FormHabitHolderComponent;
  let fixture: ComponentFixture<FormHabitHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHabitHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormHabitHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
