import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameAroundTheClockComponent } from './dart-game-around-the-clock.component';

describe('DartGameAroundTheClockComponent', () => {
  let component: DartGameAroundTheClockComponent;
  let fixture: ComponentFixture<DartGameAroundTheClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameAroundTheClockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameAroundTheClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
