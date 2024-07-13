import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetricPopupComponent } from './edit-metric-popup.component';

describe('EditMetricPopupComponent', () => {
  let component: EditMetricPopupComponent;
  let fixture: ComponentFixture<EditMetricPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMetricPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMetricPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
