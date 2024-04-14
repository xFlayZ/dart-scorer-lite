import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseSongModalComponent } from './choose-song-modal.component';

describe('ChooseSongModalComponent', () => {
  let component: ChooseSongModalComponent;
  let fixture: ComponentFixture<ChooseSongModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseSongModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseSongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
