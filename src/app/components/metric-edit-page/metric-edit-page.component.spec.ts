import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricEditPageComponent } from './metric-edit-page.component';

describe('MetricEditPageComponent', () => {
  let component: MetricEditPageComponent;
  let fixture: ComponentFixture<MetricEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
