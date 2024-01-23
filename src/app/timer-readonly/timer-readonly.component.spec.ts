import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerReadonlyComponent } from './timer-readonly.component';

describe('TimerReadonlyComponent', () => {
  let component: TimerReadonlyComponent;
  let fixture: ComponentFixture<TimerReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimerReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
