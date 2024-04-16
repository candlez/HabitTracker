import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetricHolderComponent } from './form-metric-holder.component';

describe('FormMetricHolderComponent', () => {
  let component: FormMetricHolderComponent;
  let fixture: ComponentFixture<FormMetricHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMetricHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMetricHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
