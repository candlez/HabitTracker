import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricCreatorComponent } from './metric-creator.component';

describe('MetricCreatorComponent', () => {
  let component: MetricCreatorComponent;
  let fixture: ComponentFixture<MetricCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricCreatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MetricCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
