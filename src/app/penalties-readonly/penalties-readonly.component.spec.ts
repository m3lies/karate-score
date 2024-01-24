import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltiesReadonlyComponent } from './penalties-readonly.component';

describe('PenaltiesReadonlyComponent', () => {
  let component: PenaltiesReadonlyComponent;
  let fixture: ComponentFixture<PenaltiesReadonlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenaltiesReadonlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PenaltiesReadonlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
