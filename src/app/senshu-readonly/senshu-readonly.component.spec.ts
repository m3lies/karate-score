import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenshuReadonlyComponent } from './senshu-readonly.component';

describe('SenshuReadonlyComponent', () => {
  let component: SenshuReadonlyComponent;
  let fixture: ComponentFixture<SenshuReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SenshuReadonlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SenshuReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
