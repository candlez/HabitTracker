import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitButtonBarComponent } from './submit-button-bar.component';

describe('SubmitButtonBarComponent', () => {
  let component: SubmitButtonBarComponent;
  let fixture: ComponentFixture<SubmitButtonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitButtonBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubmitButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
