import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SenshuComponent } from './senshu.component';

describe('SenshuComponent', () => {
  let component: SenshuComponent;
  let fixture: ComponentFixture<SenshuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SenshuComponent]
    });
    fixture = TestBed.createComponent(SenshuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
