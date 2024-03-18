import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBarComponent } from './create-bar.component';

describe('CreateBarComponent', () => {
  let component: CreateBarComponent;
  let fixture: ComponentFixture<CreateBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
