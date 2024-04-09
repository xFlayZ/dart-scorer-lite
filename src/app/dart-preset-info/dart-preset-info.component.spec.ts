import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DartPresetInfoComponent } from './dart-preset-info.component';

describe('DartPresetInfoComponent', () => {
  let component: DartPresetInfoComponent;
  let fixture: ComponentFixture<DartPresetInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DartPresetInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DartPresetInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
