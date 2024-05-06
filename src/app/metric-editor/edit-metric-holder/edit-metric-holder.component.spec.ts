import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMetricHolderComponent } from './edit-metric-holder.component';

describe('EditMetricHolderComponent', () => {
  let component: EditMetricHolderComponent;
  let fixture: ComponentFixture<EditMetricHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMetricHolderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditMetricHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
