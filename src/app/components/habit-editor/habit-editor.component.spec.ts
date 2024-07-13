import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitEditorComponent } from './habit-editor.component';

describe('HabitEditorComponent', () => {
  let component: HabitEditorComponent;
  let fixture: ComponentFixture<HabitEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitEditorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HabitEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
