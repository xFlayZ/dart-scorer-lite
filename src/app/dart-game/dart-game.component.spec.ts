import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameComponent } from './dart-game.component';

describe('DartGameComponent', () => {
  let component: DartGameComponent;
  let fixture: ComponentFixture<DartGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
