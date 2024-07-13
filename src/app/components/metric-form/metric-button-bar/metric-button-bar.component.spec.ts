import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricButtonBarComponent } from './metric-button-bar.component';

describe('MetricButtonBarComponent', () => {
  let component: MetricButtonBarComponent;
  let fixture: ComponentFixture<MetricButtonBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricButtonBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricButtonBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
