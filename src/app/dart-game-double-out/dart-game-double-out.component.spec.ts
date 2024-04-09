import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameDoubleOutComponent } from './dart-game-double-out.component';

describe('DartGameDoubleOutComponent', () => {
  let component: DartGameDoubleOutComponent;
  let fixture: ComponentFixture<DartGameDoubleOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameDoubleOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameDoubleOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
