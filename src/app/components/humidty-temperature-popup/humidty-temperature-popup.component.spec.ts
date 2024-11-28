import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidtyTemperaturePopupComponent } from './humidty-temperature-popup.component';

describe('HumidtyTemperaturePopupComponent', () => {
  let component: HumidtyTemperaturePopupComponent;
  let fixture: ComponentFixture<HumidtyTemperaturePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HumidtyTemperaturePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HumidtyTemperaturePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
