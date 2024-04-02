import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameDataButtonsComponent } from './dart-game-data-buttons.component';

describe('DartGameDataButtonsComponent', () => {
  let component: DartGameDataButtonsComponent;
  let fixture: ComponentFixture<DartGameDataButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameDataButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameDataButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
