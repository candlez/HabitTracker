import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetricPopupComponent } from './create-metric-popup.component';

describe('CreateMetricPopupComponent', () => {
  let component: CreateMetricPopupComponent;
  let fixture: ComponentFixture<CreateMetricPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMetricPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMetricPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
