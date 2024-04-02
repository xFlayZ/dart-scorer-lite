import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartBoardComponent } from './dart-board.component';

describe('DartBoardComponent', () => {
  let component: DartBoardComponent;
  let fixture: ComponentFixture<DartBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
