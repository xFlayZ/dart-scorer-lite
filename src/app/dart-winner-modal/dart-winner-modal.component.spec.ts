import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartWinnerModalComponent } from './dart-winner-modal.component';

describe('DartWinnerModalComponent', () => {
  let component: DartWinnerModalComponent;
  let fixture: ComponentFixture<DartWinnerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartWinnerModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartWinnerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
