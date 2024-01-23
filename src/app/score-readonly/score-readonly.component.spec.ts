import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreReadonlyComponent } from './score-readonly.component';

describe('ScoreReadonlyComponent', () => {
  let component: ScoreReadonlyComponent;
  let fixture: ComponentFixture<ScoreReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoreReadonlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
