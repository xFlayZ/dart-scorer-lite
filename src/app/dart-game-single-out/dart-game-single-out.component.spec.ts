import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameSingleOutComponent } from './dart-game-single-out.component';

describe('DartGameComponent', () => {
  let component: DartGameSingleOutComponent;
  let fixture: ComponentFixture<DartGameSingleOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameSingleOutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameSingleOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
