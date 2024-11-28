import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperaturePopupComponent } from './temperature-popup.component';

describe('TemperaturePopupComponent', () => {
  let component: TemperaturePopupComponent;
  let fixture: ComponentFixture<TemperaturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperaturePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemperaturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
