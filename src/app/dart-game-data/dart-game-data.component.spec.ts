import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartGameDataComponent } from './dart-game-data.component';

describe('DartGameDataComponent', () => {
  let component: DartGameDataComponent;
  let fixture: ComponentFixture<DartGameDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartGameDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartGameDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
