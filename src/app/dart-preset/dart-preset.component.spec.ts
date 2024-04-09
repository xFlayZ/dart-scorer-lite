import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartPresetComponent } from './dart-preset.component';

describe('DartPresetComponent', () => {
  let component: DartPresetComponent;
  let fixture: ComponentFixture<DartPresetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartPresetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartPresetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
