import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMetricBarComponent } from './create-metric-bar.component';

describe('CreateMetricBarComponent', () => {
  let component: CreateMetricBarComponent;
  let fixture: ComponentFixture<CreateMetricBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMetricBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMetricBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
